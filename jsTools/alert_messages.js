'use strict';

window.AlertMessage = {
    show: function(options) {
      var closeButton, icon_type, message;
      if (options === null) {
        options = {};
      }
      this.messageBox = $('#alert-messages');
      if (!this.messageBox.length) {
        this.messageBox = $('<div id="alert-messages"></div>').appendTo($('body'));
      }
      icon_type = (function() {
        switch (options.type) {
          case 'loading':
            return 'fa fa-spinner fa-spin';
          case 'warning':
            return 'fa fa-exclamation';
          case 'error':
            return 'fa fa-minus-circle';
          case 'success':
            return 'fa fa-check-circle';
          case 'info':
            return 'fa fa-info-circle';
        }
      })();
      message = $('<div class="alert-message alert-' + options.type + '"><i class="' + icon_type + '"></i>&nbsp;&nbsp;' + options.text + '</div>');
      if (options.scope) {
        message.addClass(options.scope);
      }
      if (!options.timeout && !options.keep) {
        message.addClass('closeable');
        closeButton = $('<a class="alert-close"><i class="fa fa-times"></i></a>').appendTo(message).on('click', function() {
          return message.remove();
        });
      }
      if (options.scope && this.hasScope(options.scope)) {
        $('#alert-messages .alert-message.' + options.scope).replaceWith(message);
      } else {
        this.messageBox.append(message);
      }
      if (options.timeout) {
        return setTimeout(function() {
          return message.fadeOut(500, function() {
            return message.remove();
          });
        }, options.timeout);
      }
    },
    remove: function(scope) {
      return $('#alert-messages .alert-message.' + scope).remove();
    },
    hasScope: function(scope) {
      return $('#alert-messages .alert-message.' + scope).length > 0;
    },
    removeAll: function() {
      $('.alert-message').remove();
    }
  };