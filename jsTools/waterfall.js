function flow(mh, mv) { // mh 水平距离  mv 垂直距离
        var containerId = "note-preview";
        var className = "thumbnail";

        var firstColumnTop = 15;

        try{
          //var w = document.documentElement.offsetWidth; //计算页面宽度
          var w = document.getElementById(containerId).offsetWidth;
          var ul = document.getElementById(containerId);
          //var li = document.getElementsByTagName("li");
          var li = document.getElementsByClassName(className);
          var iw = li[0].offsetWidth + mh; //计算数据块的宽度
          var c = Math.floor(w / iw); // 列数
          // ul.style.width = (iw * c - mh) + "px";
        }catch (e){
          console.log("waterfall crash error info:",e);
          return;
        }

        var liLen = li.length;
        var heightArr = [];
        for(var i =0; i< liLen; i++) {
            heightArr.push(li[i].offsetHeight);
        }

        try{

          var oArr = [];
          // + 15 是因为 container的 padding 值
          for(var i = 0; i < c; i ++) {
              li[i].style.top = firstColumnTop + "px";
              li[i].style.left = (iw * i +15) +"px";
              oArr.push(heightArr[i]);
          }
        }catch (err){
          console.log("笔记数不够 列数! info", err);
          return;
        }

        for(var i=c; i< liLen; i ++) {//将其他数据块定位到最短的一列后面，然后再更新该列的高度
            var min = _getMiNiKey(oArr);
            li[i].style.top = (oArr[min] + mv + firstColumnTop) + "px";
            li[i].style.left = (iw * min + 15) + "px";
            oArr[min] = heightArr[i] + oArr[min] + mv;
        }
    }

    // tools
    function _getMiNiKey(arr) {
        var a = arr[0];
        var index = 0;
        for(var k in arr) {
            if(arr[k] < a){
                a = arr[k];
                index = k;
            }
        }
        return index ;
    }
