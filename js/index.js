/**
 * Created by Alvin on 2016/8/26.
 */

var indexRender = (function () {
    //获取元素
    var oFixedNav = document.getElementById('fixedNav');
    var oFixedNavContent = document.getElementById('fixedNavContent');
    var oHead = document.getElementById('headFixed');
    var oHeadTop = document.getElementById('headTop');
    var oUpload = document.getElementById('upload');
    var oFixedUpload = document.getElementById('fixedUpload');
    var oMessage = document.getElementById('message');
    var oFixedMessage = document.getElementById('fixedMessage');
    var oRecord = document.getElementById('record');
    var oFixedRecord = document.getElementById('fixedRecord');
    var upload_hidden1 = document.getElementById('upload_hidden1');
    var message_hidden1 = document.getElementById('message_hidden1');
    var record_hidden1 = document.getElementById('record_hidden1');
//fixed


    var upload_hidden2 = document.getElementById('upload_hidden2');
    var message_hidden2 = document.getElementById('message_hidden2');
    var record_hidden2 = document.getElementById('record_hidden2');

    //隐藏固定在头部刚显示的navContent
    function fn1(e) {
        var target = e.target;
        if (target.id == 'fixedNavContent') {
            clearTimeout(this.timer);
            var _this = this;
            this.timer = setTimeout(function () {
                _this.style.display = 'none';
                oFixedNav['flagNav'] = false;
                oFixedNav.style.height='38px';
                oFixedNav.style.backgroundPosition='0 0';
            }, 500);
        }

        if (target.id == 'upload_hidden1') {
            clearTimeout(this.timer);
            var _this = this;
            this.timer = setTimeout(function () {
                _this.style.display = 'none';
                upload_hidden1['flagNav'] = false;
                oUpload.classList.remove('show');
                oUpload.getElementsByTagName('span')[0].className = '';
            }, 500);
        }
        if (target.id == 'message_hidden1') {
            clearTimeout(this.timer);
            var _this = this;
            this.timer = setTimeout(function () {
                _this.style.display = 'none';
                message_hidden1['flagNav'] = false;
                oMessage.classList.remove('show');
                oMessage.getElementsByTagName('span')[0].className = '';
            }, 500);
        }
        if (target.id == 'record_hidden1') {
            clearTimeout(this.timer);
            var _this = this;
            this.timer = setTimeout(function () {
                _this.style.display = 'none';
                record_hidden1['flagNav'] = false;
                oRecord.classList.remove('show');
                oRecord.getElementsByTagName('span')[0].className = '';
            }, 500);
        }
        if (target.id == 'upload_hidden2') {
            clearTimeout(this.timer);
            var _this = this;
            this.timer = setTimeout(function () {
                _this.style.display = 'none';
                upload_hidden2['flagNav'] = false;
                oFixedUpload.classList.remove('show');
                oFixedUpload.getElementsByTagName('span')[0].className = '';
            }, 500);
        }
        if (target.id == 'message_hidden2') {
            clearTimeout(this.timer);
            var _this = this;
            this.timer = setTimeout(function () {
                _this.style.display = 'none';
                message_hidden2['flagNav'] = false;
                oFixedMessage.classList.remove('show');
                oFixedMessage.getElementsByTagName('span')[0].className = '';
            }, 500);
        }
        if (target.id == 'record_hidden2') {
            clearTimeout(this.timer);
            var _this = this;
            this.timer = setTimeout(function () {
                _this.style.display = 'none';
                record_hidden2['flagNav'] = false;
                oFixedRecord.classList.remove('show');
                oFixedRecord.getElementsByTagName('span')[0].className = '';
            }, 500);
        }


    }

//点击页面其他位置隐藏固定在头部刚显示的navContent
    function fn2(e) {
        if (e.target.id == 'fixedNav') {
            if (!oFixedNav['flagNav']) {
                oFixedNav['flagNav'] = true;
                oFixedNavContent.style.display = 'block';
            }
            else {
                oFixedNavContent.style.display = 'none';
                oFixedNav['flagNav'] = false;
                oFixedNav.style.height='38px';
                oFixedNav.style.backgroundPosition='0 0';
            }
        } else if (e.target.id == 'fixedNavContent') {
            return;
        } else {
            oFixedNavContent.style.display = 'none';
            oFixedNav['flagNav'] = false;
            oFixedNav.style.height='38px';
            oFixedNav.style.backgroundPosition='0 0';
        }

    }

//广告展示的方式
    function adver(id) {
        var oDiv = document.getElementById(id);
        var aUl = oDiv.getElementsByTagName('ul');
        var aMark = oDiv.getElementsByClassName('mark');
        for (var i = 0; i < aUl.length; i++) {
            (function (index) {
                aUl[index].onmouseout = function (e) {
                    e = e || window.event;
                    var oTo = e.toElement || e.relatedTarget;
                    if (this.contains(oTo))return;
                    var aLi = this.getElementsByTagName('li');
                    for (var i = 0; i < aLi.length; i++) {
                        animate(aLi[i], {left: i * 190}, 500)
                    }
                    remove(index);
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                }
            })(i)
            var oUl = aUl[i];
            var aLi = oUl.getElementsByTagName('li');
            for (var j = 0; j < aLi.length; j++) {
                (function (index) {
                    aLi[index].onmouseover = function (e) {
                        e = e || window.event;
                        var oTo = e.fromElement || e.relatedTarget;
                        if (this.contains(oTo))return;
                        var curAl = this.parentNode.getElementsByTagName('li');
                        if (index == 5) {
                            for (var z = 0; z < curAl.length; z++) {
                                if (z < 5) {
                                    animate(curAl[z], {left: 0}, 300)
                                } else {
                                    animate(curAl[z], {left: 190}, 300)
                                }
                            }
                            setBigImg(this, 380);
                        } else {
                            for (var n = 0; n < curAl.length; n++) {
                                //console.log(aLi[n]);
                                if (n <= index) {
                                    animate(curAl[n], {left: 0}, 500);

                                } else {
                                    animate(curAl[n], {left: 950}, 500);
                                }
                            }
                            setBigImg(this, 190);
                        }

                        e.preventDefault ? e.preventDefault() : e.returnValue = false;
                        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                    }
                })(j)
            }

        }
        function setBigImg(obj, number) {
            var oMark = obj.parentNode.getElementsByClassName('mark')[0];
            var oMImg = oMark.getElementsByTagName('img')[0];
            oMImg.src = obj.getAttribute('bigImg');
            utils.css(oMark, {left: number});
            animate(oMark, {opacity: 1}, 500);
        }

        function remove(index) {
            // animate(oMark, {opacity: 0}, 500);
            var oMark = aMark[index];
            clearInterval(oMark.timer);
            var n = 1;
            oMark.timer = setInterval(function () {
                if (n <= 0) {
                    utils.css(oMark, 'opacity', 0);
                    return;
                }
                n -= 0.05;
                utils.css(oMark, 'opacity', n);
            }, 30)
        }

    }

    return {
        init: function () {
            /*开启轮播图*/
            var banTop = new LoopOpacity('loop1');
            var tf = new tfLoopOpacity('todayFocusLoop');
            var variety = new tfLoopOpacity('v_l1');
            var yule = new tfLoopOpacity('y_l1');
            var adv = new advertise('advertise');
            window.onscroll = function () {
                if (utils.win("scrollTop") >= utils.win('clientHeight')) {
                    oHead.style.display = 'block';
                    animate(oHead, {opacity: 1}, 300);
                } else {
                    oHead.style.display = 'none';
                    animate(oHead, {opacity: 0}, 300);
                }
            };
            //为head and fixed head 绑定事件
            (function () {
                $event.on(document, 'click', function (e) {
                    var target = e.target;
                    if (target.parentNode.id == "upload") {
                        if (!upload_hidden1['flagNav']) {
                            upload_hidden1['flagNav'] = true;
                            upload_hidden1.style.display = 'block';
                            target.getElementsByTagName('span')[0].className = 'on';
                            //$event.on(upload_hidden1, 'mouseenter', fn0);
                            $event.on(upload_hidden1, 'mouseleave', fn1);
                            target.parentNode.classList.add('show');
                            return;
                        }
                        upload_hidden1.style.display = 'none';
                        upload_hidden1['flagNav'] = false;
                        target.parentNode.classList.remove('show');
                        target.getElementsByTagName('span')[0].className = '';

                    }
                    else if (target.parentNode.id == "message") {
                        if (!message_hidden1['flagNav']) {
                            message_hidden1['flagNav'] = true;
                            message_hidden1.style.display = 'block';
                            target.getElementsByTagName('span')[0].className = 'on';
                            //$event.on(message_hidden1, 'mouseenter', fn0);
                            target.parentNode.classList.add('show');
                            $event.on(message_hidden1, 'mouseleave', fn1);
                            return;
                        }
                        message_hidden1.style.display = 'none';
                        message_hidden1['flagNav'] = false;
                        target.parentNode.classList.remove('show');
                        target.getElementsByTagName('span')[0].className = '';

                    }
                    else if (target.parentNode.id == "record") {
                        if (!record_hidden1['flagNav']) {
                            record_hidden1['flagNav'] = true;
                            record_hidden1.style.display = 'block';
                            target.parentNode.classList.add('show');
                            target.getElementsByTagName('span')[0].className = 'on';
                            //$event.on(record_hidden1, 'mouseenter', fn0);
                            $event.on(record_hidden1, 'mouseleave', fn1);
                            return;
                        }
                        record_hidden1.style.display = 'none';
                        record_hidden1['flagNav'] = false;
                        target.parentNode.classList.remove('show');
                        target.getElementsByTagName('span')[0].className = '';

                    }
                    else if (target.parentNode.id == "fixedUpload") {
                        if (!upload_hidden2['flagNav']) {
                            upload_hidden2['flagNav'] = true;
                            upload_hidden2.style.display = 'block';
                            target.parentNode.classList.add('show');
                            target.getElementsByTagName('span')[0].className = 'on';
                            //$event.on(upload_hidden2, 'mouseenter', fn0);
                            $event.on(upload_hidden2, 'mouseleave', fn1);
                            return;
                        }
                        upload_hidden2.style.display = 'none';
                        upload_hidden2['flagNav'] = false;
                        target.parentNode.classList.remove('show');
                        target.getElementsByTagName('span')[0].className = '';
                    }
                    else if (target.parentNode.id == "fixedMessage") {
                        if (!message_hidden2['flagNav']) {
                            message_hidden2['flagNav'] = true;
                            message_hidden2.style.display = 'block';
                            target.parentNode.classList.add('show');
                            target.getElementsByTagName('span')[0].className = 'on';
                            //$event.on(message_hidden2, 'mouseenter', fn0);
                            $event.on(message_hidden2, 'mouseleave', fn1);
                            return;
                        }
                        message_hidden2.style.display = 'none';
                        message_hidden2['flagNav'] = false;
                        target.parentNode.classList.remove('show');
                        target.getElementsByTagName('span')[0].className = '';
                    }
                    else if (target.parentNode.id == "fixedRecord") {
                        if (!record_hidden2['flagNav']) {
                            record_hidden2['flagNav'] = true;
                            record_hidden2.style.display = 'block';
                            target.parentNode.classList.add('show');
                            target.getElementsByTagName('span')[0].className = 'on';
                            //$event.on(record_hidden2, 'mouseenter', fn0);
                            $event.on(record_hidden2, 'mouseleave', fn1);
                            return;
                        }
                        record_hidden2.style.display = 'none';
                        record_hidden2['flagNav'] = false;
                        target.parentNode.classList.remove('show');
                        target.getElementsByTagName('span')[0].className = '';
                    }
                    else {
                        upload_hidden1.style.display = 'none';
                        oUpload.classList.remove('show');
                        oUpload.getElementsByTagName('span')[0].className = '';
                        upload_hidden1['flagNav'] = false;
                        message_hidden1.style.display = 'none';
                        oMessage.classList.remove('show');
                        oMessage.getElementsByTagName('span')[0].className = '';
                        message_hidden1['flagNav'] = false;
                        record_hidden1.style.display = 'none';
                        record_hidden1['flagNav'] = false;
                        oRecord.classList.remove('show');
                        oRecord.getElementsByTagName('span')[0].className = '';

                        upload_hidden2.style.display = 'none';
                        oFixedUpload.classList.remove('show');
                        oFixedUpload.getElementsByTagName('span')[0].className = '';
                        upload_hidden2['flagNav'] = false;
                        message_hidden2.style.display = 'none';
                        oFixedMessage.classList.remove('show');
                        oFixedMessage.getElementsByTagName('span')[0].className = '';
                        message_hidden2['flagNav'] = false;
                        record_hidden2.style.display = 'none';
                        oFixedRecord.classList.remove('show');
                        record_hidden2['flagNav'] = false;
                        oFixedRecord.getElementsByTagName('span')[0].className = '';
                    }


                });
            })();

            //单独的fixed导航
            oFixedNav.onclick = function () {
                oFixedNav.style.height = '49px';
                oFixedNav.style.backgroundPosition = '0 -39px';
                oFixedNavContent.style.display = 'block';
                $event.on(oFixedNavContent, 'mouseleave', fn1);
                $event.on(document, 'click', fn2)
            };
             //广告的推拉门效果
            adver('advertise');

        },
    }
})();
indexRender.init();



