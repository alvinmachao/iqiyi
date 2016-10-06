/**
 * Created by Alvin on 2016/8/26.
 */
function LoopOpacity(id) {
    this.oDiv = document.getElementById(id);
    this.aDiv = this.oDiv.getElementsByTagName('div');
    this.aImg = this.oDiv.getElementsByTagName('img');
    this.oUl = this.oDiv.getElementsByTagName('ul')[0];
this.aLi = this.oUl.getElementsByTagName('li');
this.step = 0;
this.timer = null;
this.init();
}
LoopOpacity.prototype = {
    constructor: LoopOpacity,
    init: function () {
        var _this = this;
        clearInterval(_this.timer);
        this.timer = setInterval(function () {
            _this.autoMove();
        }, 3000);
        this.overOut();
        this.switchByFocus();
    },
    autoMove: function () {
        if (this.step >= this.aDiv.length - 1) {
            this.step = -1;
        }
        this.step++;
        this.setBanner();
    },
    setBanner: function () {
        for (var i = 0; i < this.aDiv.length; i++) {
            if (i == this.step) {
                utils.css(this.aDiv[i], 'zIndex', 1);
                animate(this.aDiv[i], {'opacity': 1}, 300);
                this.aLi[i].className = "on";
                continue;
            }
            utils.css(this.aDiv[i], 'zIndex', 0);
            animate(this.aDiv[i], {opacity: 0}, 300);
            this.aLi[i].className = null;
        }
    },
    overOut: function () {
        var _this = this;
        this.oDiv.onmouseover = function () {
            clearInterval(_this.timer);
        }
        this.oDiv.onmouseout = function () {
            clearInterval(_this.timer);
            _this.timer = setInterval(function () {
                _this.autoMove();
            }, 3000);
        }
    },
    switchByFocus: function () {
        var _this = this;
        for (var i = 0; i < this.aLi.length; i++) {
            (function (index) {
                _this.aLi[index].onmouseover = function () {
                    _this.step = index;
                    _this.setBanner();
                }
            })(i)

        }
    }


}