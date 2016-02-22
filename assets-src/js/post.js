define(function (require, exports) {
//CMD
/******************************************** Post ********************************************/

/*检查图片原始高度 img为ele对象*/
function checkImg(img){
	var visualContainerWidh = scroller.getScroll().w;  //window.width
	var contentWidth = $('.post-content')[0].offsetWidth;
    var img_real_width,
        img_real_height,
        isMarkWrap = false;          //只有作者标记wrap class才会全宽显示
    if(img.className.split(' ').indexOf('wrap') >= 0)
        isMarkWrap = true;
    else return;//不满足wrap

    var _img = document.createElement('img');  //preload
    _img.src = img.src;
    img_real_width = _img.width;
    img_real_height = _img.height;

    /*处理inner中的图片*/
    if(isMarkWrap == true && visualContainerWidh>800 && img_real_width>900 && img_real_width > contentWidth){
        img.style.width = visualContainerWidh + 'px';
        img.style.marginLeft = -(visualContainerWidh-contentWidth)/2 + 'px';
        img.style.maxWidth = visualContainerWidh + 'px';
        var _class = img.className.split(' ');
        if(_class == 0) img.className = 'imgWrapOut';
        else{
        	_class.push('imgWrapOut');
        	img.className = _class.join(' ');
        }
    }
}
var wrapImg = [];
/* 页面初始化 */
function init() {
    
    if($('.single-post-inner')[0] && $('.single-post-inner')[0].getElementsByTagName('img'))
    Array.prototype.slice.call($('.single-post-inner')[0].getElementsByTagName('img')).forEach(function(_img){
    	if(_img.alt == 'cover-image') {
            _img.style.display = 'none';  //隐藏cover-image
            $('#post-header').style.backgroundImage = 'url(' + _img.src + ')';
        }
        if(_img.alt == 'wrap'){
        	wrapImg.push(_img);
        	_img.className = 'wrap';
        	checkImg(_img);
        }
    })
    $('#to-top').onclick = function (){scroller.goTo(0, 500);}
    $('.post-cover-info')[0].className = 'post-cover-info animated fadeInDownBig';
    var sites = $('.single-post-inner')[0].getElementsByTagName('a');
    sites = Array.prototype.slice.call(sites);
    sites.forEach(function (ele) {
        var _src = ele.href;
        var tmp = document.createElement('a');
        tmp.href = _src;
        _selfDomain = tmp.hostname;
        var _icon = urlIconlize(_selfDomain);
        var i = document.createElement('i');
        i.className = 'iconfont ' + _icon;
        ele.parentNode.insertBefore(i, ele);
        /* 鼠标悬浮效果 */
        ele.onmouseover = function () {
            ele.className = 'animated pulse';
        }
        ele.onmouseout = function (){
            ele.className = '';
        }
    });

    require('global').addReadMoreBottom();
}

/*给文章中的url添加iconfont方便识别*/
function urlIconlize(url){
    var domain,
        _output;

    /*索引 可在这里添加匹配规则*/
    var iconMap = {       
        'twitter':'icon-twitter',
        'qzone':'icon-qzone',
        'weibo':'icon-weibo',
        'facebook':'icon-facebook',
        'github':'icon-github',
        'douban':'icon-douban',
        'google':'icon-google',
        'dribble':'icon-dribble'
    }

    for(var name in iconMap){
        if(typeof iconMap[name] !== 'function'){
            var MapKey=name;
            if(url.indexOf(MapKey)>=0){
                domain=MapKey;
                _output = iconMap[MapKey];
            }
        }
    }

    return _output;
}

/* 视觉滚差 */
window.onscroll = function () {
    var top;
    if (document.documentElement && document.documentElement.scrollTop)
        top = document.documentElement.scrollTop;
    else if (document.body)
        top = document.body.scrollTop;
    else return;
    if(top > window.innerHeight - 20) return;
    var postHeader = $('#post-header');
    if(postHeader) postHeader.style.backgroundPosition = 'center ' + parseInt(top * 0.5) + 'px';
}

window.onresize = function (e) {
	wrapImg.forEach(function (i) {
		checkImg(i);
	})
}

window.onload = function (){
    init();
    /* 多说 */
    window.duoshuoQuery = {short_name:"zeroling"};
    var ds = document.createElement('script');
    ds.type = 'text/javascript';ds.async = true;
    ds.src = '/assets/js/duoshuo.embed.js';
    ds.charset = 'UTF-8';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
}

exports.checkImg = checkImg;
exports.init = init;
    
}); //end CMD