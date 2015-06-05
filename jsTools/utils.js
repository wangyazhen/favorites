/*
* 一些常见方法函数 收集
*
*
*/
var Utils = (function() {


var lowercase = function(string) {
	return isString(string) ? string.toLowerCase() : string;
};
var uppercase = function(string) {
	return isString(string) ? string.toUpperCase() : string;
};
var manualLowercase = function(s) {
  /* jshint bitwise: false */
  return isString(s)
      ? s.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);})
      : s;
};
var manualUppercase = function(s) {
  /* jshint bitwise: false */
  return isString(s)
      ? s.replace(/[a-z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) & ~32);})
      : s;
};

if ('i' !== 'I'.toLowerCase()) {
  lowercase = manualLowercase;
  uppercase = manualUppercase;
}

function isString(value) {
	return typeof value === 'string';
}

})();
