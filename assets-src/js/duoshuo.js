define(function(require, exports) {
	window.duoshuoQuery = {short_name:"zeroling"};
	var ds = document.createElement('script');
	ds.type = 'text/javascript';ds.async = true;
  ds.src = '/assets/js/duoshuo.embed.js';
	ds.charset = 'UTF-8';
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
})