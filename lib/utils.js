/**
 * Created by Alvin on 2016/8/15.
 */
var utils = (function () {
    var flag = "getComputedStyle" in window;

    function makeArray(arg) {
        var arr = [];
        try {
            arr = Array.prototype.slice.call(arg);
        } catch (e) {
            for (var i; i < arg.length; i++) {
                arr[i] = arg[i];
            }
        }
        return arr;
    }

    function jsonParse(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    function rnd(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var temp = m;
            m = n;
            n = temp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }

    //元素class操作4个
    function getByClass(classStr, parent) {
        parent = parent || document;
        if (flag) {
            return this.makeArray(parent.getElementsByClassName(classStr));
        }
        var arr = [];
        var aryClass = classStr.replace(/(^\s+)|(\s+$)/g, "").split(/\s+/g);
        var nodeList = parent.getElementsByTagName("*");
        for (var i = 0; i < nodeList.length; i++) {
            var curE = nodeList[i];
            var bOk = true;
            for (var j = 0; j < aryClass.length; i++) {
                var reg = new RegExp('\\b' + aryClass[j] + '\\b');
                if (!reg.test(curE.className)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                arr.push(curE)
            }
        }
        return arr;
    }

    function hasClass(curE, className) {
        var reg = new RegExp("\\b" + className + "\\b");
        return reg.test(curE.className);
    }

    function setClass(curE, classStr) {
        var aryClass = classStr.replace(/(^\s+)|(\s+$)/g, "").split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            if (!this.hasClass(curE, aryClass[i])) {
                curE.className += " " + aryClass[i];
            }
        }
    }

    function removeClass(curE, classStr) {
        var aryClass = classStr.replace(/(^\s+)|(\s+$)/g, "").split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            if (this.hasClass(curE, aryClass[i])) {
                var reg = new RegExp("\\b" + aryClass[i] + "\\b");
                curE.className = curE.className.replace(reg, " ").replace(/(^\s+)|(\s+$)/g, "");
            }
        }
    }

    //操控样式6个
    function win(attr, value) {
        if (value === undefined) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.body[attr] = value;
    }

    function offset(curE) {
        var l = curE.offsetLeft;
        var t = curE.offsetTop;
        var par = curE.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t};
    }

    function getCss(curE, attr) {
        var val = null;
        if (flag) {
            //标准浏览器
            val = getComputedStyle(curE, null)[attr];
        }
        else {
            if (attr === 'opacity') {
                val = curE.currentStyle["filter"];
                var reg = /^alpha\(opacity[=:](\d+)\)$/i;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            }
            else {
                val = curE.currentStyle[attr];
            }
        }
        var re = /^[+-]?(\d|([1-9]\d+))(\.\d+)?(pt|px|rem|em)$/i;
        return val = re.test(val) ? parseFloat(val) : val;
    }

    function setCss(curE, attr, value) {
        if (attr === "opacity") {
            curE.style.opacity = value;
            curE.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        if (attr === "float") {
            curE.style.cssFloat = value;
            curE.style.styleFloat = value;
            return;
        }
        var reg = /^(height|width|top|left|right|bottom|((margin|padding)(left|top|right|bottom)?))$/i;
        //value = reg.test(attr) ? parseFloat(value) + "px" : value;
        if (reg.test(attr)) {
            if (!(value.toString().toLowerCase() === "auto" || value.toString().indexOf('%') !== -1)) {
                value = parseFloat(value) + "px";
            }
        }
        curE.style[attr] = value;
    }

    function setGroupCss(curE, objCss) {
        for (var attr in objCss) {
            this.setCss(curE, attr, objCss[attr]);
        }
    }

    function css(curE) {
        var ar2 = arguments[1];
        if (typeof ar2 === "string") {
            var ar3 = arguments[2];
            if (ar3 === undefined) {
                return this.getCss(curE, ar2);
            }
            this.setCss(curE, ar2, ar3);
        }
        if (ar2.toString() === '[object Object]') {
            this.setGroupCss(curE, ar2);
        }
    }

    //元素节点关系10 个
    function getChildren(curE, tagName) {
        var childList = curE.childNodes;
        var arr = [];
        for (var i = 0; i < childList.length; i++) {
            var cur = childList[i];
            if (cur.nodeType === 1) {
                if (tagName !== undefined) {
                    if (cur.tagName.toLowerCase() === tagName.toLowerCase()) {
                        arr.push(cur);
                    }
                }
                else {
                    arr.push(cur);
                }
            }
        }
        return arr;
    }

    function pre(curE) {
        if (flag) {
            return curE.previousElementSibling;
        }
        var pre = curE.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    function preAll(curE) {
        var p = this.pre(curE);
        var arr = [];
        while (p) {
            arr.unshift(p);
            p = this.pre(p);
        }
        return arr;
    }

    function next(curE) {
        if (flag) {
            return curE.nextElementSibling;
        }
        var ne = curE.nextSibling;
        while (ne && ne.nodeType !== 1) {
            ne = ne.nextSibling;
        }
        return ne;
    }

    function nextAll(curE) {
        var n = this.next(curE);
        var arr = [];
        while (n) {
            arr.push(n);
            n = this.next(n);
        }
        return arr;
    }

    function sibling(curE) {
        var arr = [];
        var p = this.pre(curE);
        var n = this.next(curE);
        if (p)arr.push(p);
        if (n)arr.push(n);
        return arr;
    }

    function siblings(curE) {
        var pAll = this.preAll(curE);
        var nAll = this.nextAll(curE);
        return pAll.concat(nAll);
    }

    function index(curE) {
        return this.preAll(curE).length;
    }

    function firstChild(curE) {
        var all = this.getChildren(curE);
        return all[0];
    }

    function lastChild(curE) {
        var all = this.getChildren(curE);
        return all[all.length - 1];
    }

    //元素动态创建 4
    function appendChild(parent, newE) {
        return parent.appendChild(newE);
    }

    function prependChild(parent, newE) {
        var all = this.getChildren(parent);
        if (all[0]) {
            return parent.insertBefore(newE, all[0]);
        }
        return parent.appendChild(newE);
    }

    function insertBefore(newE, oldE) {
        return oldE.parentNode.insertBefore(newE, oldE);
    }

    function insertAfter(newE, oldE) {
        var next = this.next(oldE);
        if (next) {
            return oldE.parentNode.insertBefore(newE, next);
        }
        return oldE.parentNode.appendChild(newE);
    }


    return {
        makeArray: makeArray,
        jsonParse: jsonParse,
        rnd: rnd,
        getByClass: getByClass,
        hasClass: hasClass,
        setClass: setClass,
        removeClass: removeClass,
        win: win,
        offset: offset,
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css,
        getChildren: getChildren,
        pre: pre,
        preAll: preAll,
        next: next,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        appendChild: appendChild,
        prependChild: prependChild,
        insertBefore: insertBefore,
        insertAfter: insertAfter
    };
})
();
