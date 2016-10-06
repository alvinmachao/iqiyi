/**
 * Created by Alvin on 2016/8/24.
 */
(function () {
    function wheel(ele, callback) {
        function fnWheel(e) {
            e = e || window.event;
            var bOk = false;
            if (e.wheelDelta) {//IE or Chrome
                bOk = e.wheelDelta < 0 ? true : false;
            }
            else {//firefox
                bOk = e.detail > 0 ? true : false;
            }
            callback && callback.call(ele, bOk);
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        }

        if (navigator.userAgent.toLowerCase().indexOf("firefox") !== -1) {
            ele.addEventListener("DOMMouseScroll", fnWheel, false);
        }
        else {
            ele.onmousewheel = fnWheel;
        }

    }


    window.wheel = wheel;
})()
