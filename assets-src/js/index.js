define(function (require, exports) {
//CMD
var $ = window.$; //据说这样会快点0.0
/************************************************ index **************************************************/
function init() {
/*若文章没有图片，则在首页显示文字摘要*/
    Array.prototype.slice.call($('.post-image')).forEach(function(ele){
    	var _p = ele.getElementsByTagName('p');
        if(_p.length == 0 || _p[0].innerHTML == '')
           ele.parentNode.getElementsByClassName('excerpt-word')[0].className = 'excerpt-word';
    })
    
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
init();
exports.init = init;
});//end CMD
