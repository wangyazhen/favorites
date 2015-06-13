/**
 * Created by wyz on 14-6-26.
 */

var _ANDA = {
  util: {
    // 动画类型
    _animate_type : {
      slideLeft  : "slideLeft",   //对象向左划入
      slideRight : "slideRight",  //对象向右划入
      fadeIn     : "fadeIn",      //淡入
      fadeOut    : "fadeOut",     //淡出
      none       : "none"         //无动画效果
    },
    /**
     * 判断手机号是否正确
     * @param mobileNo 卡号
     * @return 正确返回 true, 错误返回 false
     */
    isValidMobileNo:function(mobileNo){
      //非空
      if(mobileNo == null || mobileNo == ""){
        return false;
      }
      //长度不正确
      else if (mobileNo.length != 11) {
        return false;
      }
      //非数字
      else if (!jQuery.isNumeric(mobileNo)){
        return false;
      }
      return true;
    },
    /**
     * 判断银行卡号是否正确
     * @param cardNo 卡号
     * @return 正确返回 true, 错误返回 false
     */
    isValidCardNo:function(cardNo){
      var cardNo = cardNo.replace(/\s/g, "");// 去掉所有的空格
      //非空
      if(cardNo == null || cardNo == ""){
        return false;
      }
      //长度不正确
      else if (cardNo.length < 16 || cardNo.length > 19) {
        return false;
      }
      //非数字
      else if (!jQuery.isNumeric(cardNo)){
        return false;
      }
      return true;
    },
    /**
    * 判断条形码
    * author： wangyz
    * */
    isValidBarCodeNo: function(barcodeNo){
      var barcodeNo = barcodeNo.replace(/\s/g, "");
      if(barcodeNo == null){
        return false;
      }
      else if(barcodeNo.length < 20 || barcodeNo.length > 50){
        return false;
      }
      // 非数字
      else if(!jQuery.isNumeric(barcodeNo)) {
        return false;
      }
      return true;
    },
    /**
    *  格式化手机号
    *  author wyz
    * */
    formatMobileNo : function(mobileNo){
      if(mobileNo == null || mobileNo == ""){ return mobileNo;}
      var tempValue = mobileNo.replace(/\s/g, "");
      var v ="";
      v += tempValue.substring(0, 3);
      v += " ";
      var s2 = tempValue.substring(3);
      for(var i=0;i<s2.length; i++){
        v += s2.substring(i, i+1);
        if((i+1) % 4 ==0){
          v += " ";
        }
      }
      return jQuery.trim(v);
    },
    /**
     * 去掉字符串中所有空格
     * @param nativeStr
     * @returns 去掉后的字符串
     */
     removeSpace: function(nativeStr) {
       if(typeof nativeStr == "string"){
         return nativeStr.replace(/\s/g, "");// 去掉所有的空格
       }
     },
      /**
     * 格式化卡号
     * @param cardNo 卡号
     * @return 格式化后的卡号
     */
    formatCardNo : function (cardNo) {
      if(cardNo == null || cardNo == "") { return cardNo; }
      var tempValue = (""+cardNo).replace(/\s/g, "");
      var v = "";
      for (var i=0;i<tempValue.length;i++) {
        v += tempValue.substring(i,i+1);
        if ((i+1)%4 == 0) {
          v += " ";
        }
      }
      return jQuery.trim(v);
    },
    /**
     * 格式化账单号码
     * @param no 账单号码
     * @return 格式化后的账单号码
     */
    formatBarcode : function (no) {
      if(no == null || no == "") { return no; }
      var tempValue = (""+no).replace(/\s/g, "");
      var v = "";
      for (var i=0;i<tempValue.length;i++) {
        v += tempValue.substring(i,i+1);
        if ((i+1)%4 == 0) {
          v += " ";
        }
      }
      return jQuery.trim(v);
    },
    /**
     * 格式化金额
     * @param money 金额
     * @param accuracy 精度(小数位数)
     * @return 格式化后的金额
     */
    formatMoney : function (money, accuracy) {
      if(money == null || money == "") { return money; }
      money = money + "";
      var tempValue = money.replace(/\s/g, "");
      var tempArray = null;
      var v = "";
      //如果为整数
      if (accuracy <= 0) {
        if (tempValue.indexOf(".") != -1) {
          v = tempValue.split(".")[0];
        } else {
          v = tempValue;
        }
      }
      //如果为小数
      else {
        if (tempValue.indexOf(".") != -1) {
          tempArray = tempValue.split(".");
          v = tempArray[0] + "." + (tempArray[1]+"00000000000000000").substring(0,accuracy);
        } else {
          v = tempValue + "." + ("00000000000000000").substring(0, accuracy);
        }
      }
      return v;
    },
    /**
     * 保持焦点一直在对象里,并且光标始终在最后
     * @param obj 需要获得焦点的对象
     * @return void
     */
    focusPassword : function(obj) {
      obj.focus();
      try{
        var rtextRange = obj.createTextRange();
        rtextRange.moveStart('character',obj.value.length);
        rtextRange.collapse(true);
        rtextRange.select();
      } catch (e) {}
    },
    /**
     * 动画效果
     * @param obj 对象
     * @param data 动画参数 1.可以是方法, 2可以是字符串, 3可以是JSON数据{type:"fadeIn", speed: 300};
     * @return void
     */
    animate : function (obj, data) {
      try {
        if (obj == null || obj.length <= 0 || data == null) {
          return;
        }

        var type = null;
        var speed = null;

        if (jQuery.isFunction(data)) {
          data();
        } else if (typeof data == "object") {
          type = data.type;
          speed = data.speed;
        } else if (typeof data == "string") {
          type = data;
        } else {
          return;
        }

        type = (type == null) ?  this._animate_type.none : type;

        //停止当前动画
        obj.stop();
        //无动画
        if (type == this._animate_type.none) {
          return;
        }
        //淡入
        else if (type == this._animate_type.fadeIn) {
          speed = (speed == null || !jQuery.isNumeric(speed)) ? 200 : speed;
          obj.hide().fadeIn(speed, function() {

          });
        }
        //淡出
        else if (type == this._animate_type.fadeOut) {
          speed = (speed == null || !jQuery.isNumeric(speed)) ? 200 : speed;
          obj.show().fadeOut(speed, function() {

          });
        }

        //左侧切换过场
        else if (type == this._animate_type.slideLeft) {
          speed = (speed == null || !jQuery.isNumeric(speed)) ? 200 : speed;
          //获得原始坐标
          var oldLeft = obj.css("margin-left").replace("px","") * 1;
          //舞台移到最右边,变透明
          obj.show().css("margin-left", 1024 - 600).css("opacity", 0.2);
          //开始运动
          obj.animate({"margin-left":oldLeft/3*2, "opacity":1}, { queue: true, "duration": speed, "easing": "swing"})
            .animate({"margin-left":oldLeft}, { queue: true, "duration": speed/2, "easing": "swing"});
        }

        //右侧切换过场
        else if (type == this._animate_type.slideRight) {
          speed = (speed == null || !jQuery.isNumeric(speed)) ? 200 : speed;
          //获得原始坐标
          var oldLeft = obj.css("margin-left").replace("px","") * 1;
          //舞台移到最左边
          obj.show().css("margin-left", -1024 + 600).css("opacity", 0.2);
          //开始运动
          obj.animate({"margin-left":oldLeft/3*2, "opacity":1}, { queue: true, "duration": speed, "easing": "swing"})
            .animate({"margin-left":oldLeft}, { queue: true, "duration": speed/2, "easing": "swing"});
        }
      } catch (e){
        //do nothing
        console.log("util animation exception ");
      }
    },
    /**
     *  禁止图片可以拖动
     */
    imgDisableDragDrop: function(){
      $("img").mousedown(function(event) {
        event.preventDefault();
        return false;
      });
    },
    setCardNoFuzzy: function(cardNo, startIndex, endIndex) {
      try {
        //var cardNo = this.removeSpace(cardNo);
        var beforeStr = cardNo.substring(0, startIndex);
        var afterStr  = cardNo.substring(endIndex, cardNo.length);
        var mobileStr = cardNo.substring(startIndex, endIndex);
        var mobileStrArr = _.toArray(mobileStr);
        var resultArr = _.map(mobileStrArr, function(val) {
          return val.replace(val, '*');
        });
        return beforeStr + resultArr.join('') + afterStr;
      } catch (e) {
        console.error("setCardFuzzy is Expection:--- ", e);
      }


    },
    /**
     * 根据track2  获取卡号
     */
    getCardNo: function(track2data) {
      return track2data.substring(0, track2data.lastIndexOf("="));
    },
    // 做个标记  记录是点击了水电煤中的哪一个 然后来控制信息确认显示图标
    flagConfirmIcon : ''
  },
  // ------- 公用的一些信息 -------  //
  commonData: {
    terminalName    : '信联网城', // 终端名称  打印凭条顶部名称
    terminalNo      : '',       // 终端号
    signInFlag      : true      // 签到标记 true is success
  },
  //收集的业务数据   手机充值
  transData : {
    //-------------系统必须-------------//
    transId 		: '',

    //-------------业务数据-------------//

    mobileNo        : "",   //需要充值的手机号
    fee 			      : "",	  //手续费
    cardFee 		    : 0,	  //卡-手续费
    serialNumber    : "",   // 流水号

    //-------------支付数据-------------//
    transAmt        : "",   //交易金额
    payAmt          : "",   //支付金额
    cardKind        : "",   //卡类型
    cardNo          : "",   //借记卡卡号
    track2          : "",   //2磁道
    track3          : "",   //3磁道
    encTrack        : "",   //加密磁道
    password        : "",   //密码
    passwordTryTimes: 0,    //密码错误次数
    payMode         : "",
    pointChannel    : "",   //积分渠道
    pointAccount    : "",   //积分账户
    usePoint   		  : "",   //支付积分
    discountAmt   	: "",   //抵扣金额

    //-------------MAC数据-------------//
    mac1            : "",
    mac2            : "",
    mac3            : ""
  },
  // 余额查询
  queryCardBalance : {
    cardNo       : '',
    cardTrack2   : '',
    cardTrack3   : '',
    cardPassword : '',
    cardBalance  : 0
  },
  // 交易结果
  transResult : {
    mobile : undefined
  },
  // 转账记录的数据
  transferData: {
    receiptCardNumber  : '',     //收款卡卡号
    receiptCardTrack2  : '',
    receiptCardTrack3  : '',
    transferAmt        : "",     // 转账金额
    transferFree       : '3.00', // 转账手续费
    payAmt             : "",             // 支付金额
    receiptMobileNumber: '',     // 手机号
    paymentCardNumber  : '',     // 支付卡号
    paymentCardTrack2  : '',
    paymentCardTrack3  : '',
    paymentCardPassword: ''      // 支付密码
  },
  // 公共事业保存数据
  publicAffairsData: {

    barcodeNo: undefined,  // 条形码号
    companyName: '',       // 出账机构
    payAmt   : undefined   // 支付金额 分 单位
  },
  // 信用卡还款
  creditCardData: {
    creditCardNo    : '',   // 收款信用卡 卡号
    creditCardTrack2: undefined,
    creditCardTrack3: undefined,
    displayInfo     : '',   // 到账时间
    repayment       : 0,    // 还款金额
    sendRepayment   : 0,    // 发送数据 * 100
    freeNo          : 0,    // 手续费
    receiveMobileNo : '',   // 接受信息的手机号
    payAmount       : 0,    // 支付金额
    serialNumber    : ''    // 交易流水号
  }
};