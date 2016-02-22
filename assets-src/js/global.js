define(function (require, exports) {
//CMD

/*
 *  为ghostwill主题的去jQ支持
 *  By [ZeroLing](http://www.zeroling.com)
 *  Theme original By luolei.org
 */
/***************************************** Golbal ********************************************/

//默认全局属性
//域名 && 默认使用的Cover-Image
window._siteDomain = window.location.host;
window._defaultImageSource = "https://dn-redrock.qbox.me/42794949.png-cover";
// document.addEventListener('DOMNodeInserted', function(e) {
//     var element = e.target;
//     if ((element.className && element.className.indexOf('ds-comments') > -1) || (element.className && element.className.indexOf('ds-replybox') > -1)) { 
//         var imgs = element.querySelectorAll('img');
//         for(var i = 0; i < imgs.length; i++) {
//             if(imgs[i].src) {
//                 var rawSrc = imgs[i].src;
//                 imgs[i].src = "https://dn-redrock.qbox.me/QQ20150811-1@2x.jpg-head";
//             }
//         }
        
//     }
// }, true);
// console.log("imghack ready");

var Ajax = require('ajax').Ajax;

/* 工具函数暴露到全局 */
window.$ = function (str) {
    if(!str) return "false";
    if(str[0]=="#"){return document.getElementById(str.split("#")[1]);}
    if(str[0]=="."){return document.getElementsByClassName(str.split(".")[1]);}
    return document.getElementsByTagName(str);
}

window.$.extend = function () {
    var _arg = Array.prototype.slice.call(arguments);
    for(var i = 0, len = _arg.length; i < len - 1; i++){
        var former = _arg[i], latter = _arg[i+1];
        for(j in latter) former[j] = latter[j];
    }
    return _arg[0];
}

/* 滚动器构造函数 */
function Scroller() {
  this.defaultDelay = 500; //单位ms
  if (document.documentElement && document.documentElement.scrollTop)
        this.bodyEle = document.documentElement;
    else if (document.body)
        this.bodyEle = document.body;
    this.init();
}

Scroller.prototype.init = function (callback) {
  this.lock = 'ready';
  clearTimeout(this.timer);
    this.bezierT = this.bezier = 0;
    this.getScroll(function () {
      callback && callback();
    });
}

/* 获取页面当前Scroll位置 */
Scroller.prototype.getScroll = function (callback) {
    var t, l, w, h;

    this.t = t = this.bodyEle.scrollTop;
    this.l = l = this.bodyEle.scrollLeft;
    this.w = w = this.bodyEle.scrollWidth;
    this.h = h = this.bodyEle.scrollHeight;
  
  callback && callback();
    window._s = {t: t, l: l, w: w, h: h};
    return window._s;
}

/* 滚动到offsetTop位置 */
Scroller.prototype.scrollTo = function(pos ,callback) {
    this.bodyEle.scrollTop = pos;
    callback && callback();
}

/* 以time时间平滑滚动到pos */
Scroller.prototype.goTo = function(pos, time, callback) {
  var that = this;
    if (this.getScroll().t == pos) {
      callback && callback();
      return this.init();
    }
    this.curve(pos, function (tar) {
      that.scrollTo(tar, function (){
        that.timer = setTimeout(function() {
            that.goTo(pos, time);
        }, time / 33); //与贝塞尔函数执行总次数有关
      });
    });
}

Scroller.prototype.stop = function(callback) {
    this.init(function (){
      callback && callback();
    });
}

/* 滚动器贝塞尔参数 */
Scroller.prototype.curve = function(pos, callback) {
    if (this.bezierT >= 0.9) {
        if (this.bezierT >= 0.95)
            this.bezierT += 0.005;
        else this.bezierT += 0.01;
    } else this.bezierT += 0.05;
    //一共执行33次
    var p0 = this.t,
        p1 = this.t,
        p2 = pos,
        t = this.bezierT,
        bezier = (1 - t) * (1 - t) * p0 + 2 * t * (1 - t) * p1 + t * t * p2;
    this.bezier = bezier;

    callback && callback(bezier);
    return bezier;
}

/**
 * 语法Candy.
 * @param  {[type]} addition [相对位移, 单位px]
 * @param  {[type]} time     [时间, 单位ms]
 */
Scroller.prototype.goUp = function(addition, time) {
  var that = this;
  time = time || this.defaultDelay;
  this.stop(function(){
      var _pos = that.t - addition > 0 ? that.t - addition : 0;
      that.goTo(_pos, time); 
  });
}
Scroller.prototype.goDown = function(addition, time) {
  var that = this;
  time = time || this.defaultDelay;
  this.stop(function () {
    var _bottomPos = that.bodyEle.scrollHeight - that.bodyEle.clientHeight;
      var _pos = that.t + addition < _bottomPos ? that.t + addition : _bottomPos;
      that.goTo(_pos, time);
  });
}
Scroller.prototype.goToEle = function(ele, time) {
  var that = this;
  time = time || this.defaultDelay;
  this.stop(function () {
    var _pos = ele.offsetTop + ele.offsetParent.offsetTop;
      that.goTo(_pos, time);
  });
}

/* 加载过多说之后显示多说评论框 */
function toggleDuoshuoComments(){
    var container = $('.comment-area')[0];
    var el = $('.ds-thread')[0];
    DUOSHUO.EmbedThread(el);
    if(container) container.appendChild(el);
}

function addReadMoreBottom(){
    var coverArrow = $('.story-cover-arrow')[0];
    if(coverArrow){
        coverArrow.onclick = function (){
            scroller.goToEle($('.story-cover-arrow')[0], 400);
        }
        coverArrow.onmouseover = function () {
            $('.post-header-mask')[0].style.opacity = 0.3;
            coverArrow.className += ' hoverLight';
            $('.post-cover-info').className += ' animated fadeOutUp';
            var h4 = $('#continue-reading');
            h4.style.display = 'block';
        }
        coverArrow.onmouseout = function (){
            var h4 = $('#continue-reading');
            h4.style.display = 'none';
        }
    }
}

function checkKey(ev) {
    ev = ev || window.event;
    if (ev.keyCode == '38' || ev.keyCode == '40') ev.preventDefault();
    if (ev.keyCode == '38') 
        scroller.goUp(400, 400);
    else if (ev.keyCode == '40')  
        scroller.goDown(400, 400);
}

/* PJAX处理器 */
function pjaxHandler (addr, type) {
    var ajax = new Ajax();
    var init = function (data){
        var _html = document.createElement('html');
        _html.innerHTML = data;
        var state = {
            title: document.title,
            url: addr
        }
        var newTitle = _html.querySelector('title').innerHTML;
        window.history.pushState(state, newTitle, addr);
        var newContainer = _html.querySelector('#container');
        $('#container').innerHTML = newContainer.innerHTML;
        document.title = newTitle;
        setTimeout(function () {
            $('#container').style.opacity = 1;
        }, 200);
        scroller.goTo(0, 400);
        addReadMoreBottom();
        if(document.getElementsByTagName('code').length > 0){seajs.use('hljs', function(hljs){hljs.initHighLight();});}
    }
    ajax.get(addr, function (data) {
        //console.log('Pjax! Get XHR:', addr, type);
        switch (type) {
            case 'about': init(data);                   //某个'页面'页面
                          seajs.use(["page"], function (page) {
                                page.initSearch();
                                toggleDuoshuoComments();
                                hijackLinks();
                          });
                          break;
            default: init(data);
                     if(!type || type == 'page'){  //for index
                         seajs.use('index', function (index) {
                             index.init();
                             hijackLinks();
                         })
                         break;
                     }            
                     seajs.use(["post"], function (post) {       //post
                            post.init()
                            toggleDuoshuoComments();
                            hijackLinks();
                     });
                     break;
        }
        $('.bar')[0].style.width = '100%';
        setTimeout(function(){
            $('#nprogress').style.opacity = 0;
        } ,200);
        setTimeout(function(){
            $('.bar')[0].style.width = '0%';
        } ,450);
        $('#to-top').onclick = function (){scroller.goTo(0, 500);}
    })
}

/* 处理站内站外链接 */
function linkHandler(link) {
    var _link = link.split('/');
    if (_link[2] == _siteDomain) { //站内
        if(_link[3] == 'rss') return location.href = link;  //站内特例
        pjaxHandler(link, _link[3]);
    } else { //站外
        location.href = link;
    }
}

/* 超链劫持 */
function hijackLinks () {
    Array.prototype.slice.call(document.getElementsByTagName('a')).forEach(function(_a) {
        _a.onclick = function(ev) {
            ev.preventDefault();
            $('#nprogress').style.opacity = 1;
            $('.bar')[0].style.width = '20%';
            $('#container').style.opacity = 0;
            linkHandler(_a.href);
        }
    })
}

/* 全局键盘事件绑定 */
document.onkeydown = checkKey;
document.onmousewheel = function () {
    scroller.stop();
}
/* 滚动器实例 公用 */
window.scroller = new Scroller();

window.onpopstate = function (ev) {
    if(!ev.state) return;   //safari在第一次载入时会触发这个事件
    $('#nprogress').style.opacity = 1;
    $('.bar')[0].style.width = '20%';
    linkHandler(ev.state.url);
}

window.onload = function (){
    hijackLinks();

    /* 返回顶部 */
    $('#to-top').onclick = function (){scroller.goTo(0, 500);}
    
    /* 多说 */
    window.duoshuoQuery = {short_name:"zeroling"};
    var ds = document.createElement('script');
    ds.type = 'text/javascript';ds.async = true;
    ds.src = '//static.duoshuo.com/embed.js';
    ds.charset = 'UTF-8';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
    
    /* 统计 */
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?c06de1e3596fc40979bf743098c3c7d1";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
    })();
}

exports.addReadMoreBottom = addReadMoreBottom;
exports.hijackLinks = hijackLinks;

}); //end CMD
