define(function (require, exports) {

function initSearch(){
	var _searchTimer;
	$('.search-form-input')[0].onfocus = function(){
	    clearTimeout(_searchTimer);
	    $('.search-bar-result')[0].style.visibility = 'visible';
	    $('.search-bar-result')[0].style.opacity = '0.9';
	};
	$('.search-form-input')[0].onblur = function(){
	    $('.search-bar-result')[0].style.opacity = '0';
	    _searchTimer = setTimeout(function (){
	        $('.search-bar-result')[0].style.visibility = 'hidden';
	    }, 400);
	};
	
	var GhostBot = require('ghostbot').GhostBot;
	var g = new GhostBot({
		inputbox: $('.search-form-input')[0],
		target: $('.quick-search')[0],
		info_template: "<h4>找到{{amount}}篇相关的文章</h4>",
	    result_template: "<a href='{{link}}' class='searchResult'>{{title}}</a>",
	})
}
/* 在页面中启用搜索 */
exports.initSearch = initSearch;
initSearch();

window.onload = function () {
	$('#to-top').onclick = function (){scroller.goTo(0, 500);}
	/* 多说 */
	window.duoshuoQuery = {short_name:"zeroling"};
	var ds = document.createElement('script');
	ds.type = 'text/javascript';ds.async = true;
	ds.src = '/assets/js/duoshuo.embed.js';
	ds.charset = 'UTF-8';
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
}


});