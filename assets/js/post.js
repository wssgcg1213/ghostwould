"use strict";define(function(e,o){function n(e){var o,n,t=scroller.getScroll().w,a=$(".post-content")[0].offsetWidth,i=!1;if(e.className.split(" ").indexOf("wrap")>=0){i=!0;var c=document.createElement("img");if(c.src=e.src,o=c.width,n=c.height,1==i&&t>800&&o>900&&o>a){e.style.width=t+"px",e.style.marginLeft=-(t-a)/2+"px",e.style.maxWidth=t+"px";var s=e.className.split(" ");0==s?e.className="imgWrapOut":(s.push("imgWrapOut"),e.className=s.join(" "))}}}function t(){$(".single-post-inner")[0]&&$(".single-post-inner")[0].getElementsByTagName("img")&&Array.prototype.slice.call($(".single-post-inner")[0].getElementsByTagName("img")).forEach(function(e){"cover-image"==e.alt&&(e.style.display="none",$("#post-header").style.backgroundImage="url("+e.src+")"),"wrap"==e.alt&&(i.push(e),e.className="wrap",n(e))}),$("#to-top").onclick=function(){scroller.goTo(0,500)},$(".post-cover-info")[0].className="post-cover-info animated fadeInDownBig";var o=$(".single-post-inner")[0].getElementsByTagName("a");o=Array.prototype.slice.call(o),o.forEach(function(e){var o=e.href,n=document.createElement("a");n.href=o,_selfDomain=n.hostname;var t=a(_selfDomain),i=document.createElement("i");i.className="iconfont "+t,e.parentNode.insertBefore(i,e),e.onmouseover=function(){e.className="animated pulse"},e.onmouseout=function(){e.className=""}}),e("global").addReadMoreBottom()}function a(e){var o,n,t={twitter:"icon-twitter",qzone:"icon-qzone",weibo:"icon-weibo",facebook:"icon-facebook",github:"icon-github",douban:"icon-douban",google:"icon-google",dribble:"icon-dribble"};for(var a in t)if("function"!=typeof t[a]){var i=a;e.indexOf(i)>=0&&(o=i,n=t[i])}return n}var i=[];window.onscroll=function(){var e;if(document.documentElement&&document.documentElement.scrollTop)e=document.documentElement.scrollTop;else{if(!document.body)return;e=document.body.scrollTop}if(!(e>window.innerHeight-20)){var o=$("#post-header");o&&(o.style.backgroundPosition="center "+parseInt(.5*e)+"px")}},window.onresize=function(e){i.forEach(function(e){n(e)})},window.onload=function(){t(),window.duoshuoQuery={short_name:"zeroling"};var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="/assets/js/duoshuo.embed.js",e.charset="UTF-8",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(e)},o.checkImg=n,o.init=t});