/**
 * Created by Alvin on 2016/8/26.
 */
function tfLoopOpacity(id) {
    this.oDiv = document.getElementById(id);
    this.aDiv = utils.getByClass('loop', this.oDiv.getElementsByTagName('div')[0]);
    this.lbTn = this.oDiv.getElementsByTagName('input')[0];
    this.rbTn = this.oDiv.getElementsByTagName('input')[1];
    this.step = 0;
    this.timer = null;
    this.init();
}
tfLoopOpacity.prototype = {
    constructor: tfLoopOpacity,
    init: function () {
        var _this = this;
        clearInterval(_this.timer);
        this.timer = setInterval(function () {
            _this.autoMove();
        }, 3000);
        this.overOut();
        this.switchBybTn();
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
                continue;
            }
            utils.css(this.aDiv[i], 'zIndex', 0);
            animate(this.aDiv[i], {opacity: 0}, 300);
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
    switchBybTn: function () {
        var _this = this;
        this.lbTn.onclick = function () {
            if (_this.step <= 0) {
                _this.step = _this.aDiv.length;
            }
            _this.step--;
            _this.setBanner();

        }
        this.rbTn.onclick = function () {
            _this.autoMove();
        }
    }


}