/**
 * Created by Alvin on 2016/8/27.
 */
(function () {
    function processThis(fn, obj) {
        return function (e) {
            fn.call(obj, e);
        }
    }

    function on(ele, type, fn) {
        //自定义事件的定义添加阶段
        if (/^my/.test(type)) {
            if (!ele['myEvent' + type]) {
                ele['myEvent' + type] = [];
            }
            var arr1 = ele['myEvent' + type];
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] == fn)return;
            }
            arr1.push(fn);
        }
        else {
            if (ele.addEventListener) {
                ele.addEventListener(type, fn, false);
                return;
            }
            //在非标准的IE6-8 中 三个问题待解决
            //1.this 问题
            //2.去重复问题
            //3.执行顺序问题
            if (!ele["event" + type]) {
                ele["event" + type] = [];
                ele.attachEvent("on" + type, function () {
                    run.call(ele);
                });
            }
            var arr = ele["event" + type];
            if (arr && arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == fn) return;
                }
            }
            arr.push(fn);
        }

    }

    function run() {
        var e = window.event;
        if (window.event) {
            e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
            e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
            e.target = e.srcElement;
            e.preventDefault = function () {
                e.returnValue = false;
            };
            e.stopPropagation = function () {
                e.cancelBubble = true;
            }
        }
        var a = this["event" + e.type];
        if (a && a.length) {
            for (var i = 0; i < a.length; i++) {
                if (typeof a[i] === "function") {
                    a[i].call(this, e);
                }
                else {
                    a.splice(i, 1);
                    i--;
                }
            }
        }
    }

    function off(ele, type, fn) {
        //自定义事件的删除阶段
        if (/^(my)/.test(type)) {
            var arr1 = ele["myEvent" + type];
            if (arr1 && arr1.length) {
                for (var i = 0; i < arr1.length; i++) {
                    if (arr1[i] == fn) {
                        arr1[i] = null;
                        return;
                    }
                }
            }

        }
        else {
            if (ele.removeEventListener) {
                ele.removeEventListener(type, fn, false);
                return;
            }
            var a = ele["event" + type];
            if (a && a.length) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i] == fn) {
                        a[i] = null;
                        break;
                    }
                }
            }
        }

    }

    function publish(ele, type) {
        var a = ele["myEvent" + type];
        var arg = Array.prototype.splice.call(arguments, 2);
        if (a && a.length) {
            for (var i = 0; i < a.length; i++) {
                if (typeof  a[i] === 'function') {
                    a[i].apply(ele, arg);
                } else {
                    a.splice(i, 1);
                    i--;
                }
            }
        }
    }

    window.$event = {
        on: on,
        off: off,
        processThis: processThis,
        publish: publish
    };
})()
