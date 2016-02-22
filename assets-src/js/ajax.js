define(function (require, exports) {
	
/**
 * [Ajax Construct Function]
 * Usage: var ajax = new Ajax();
 *        ajax.post("ajax.php", "user=user&pwd=pwd", function (res) {
 *            document.write(res);
 *        })
 */
function Ajax() {
    "use strict";
    var aja = {};
    aja.tarUrl = '';
    aja.postString = '';
    aja.createAjax = function () {
        var xmlhttp;
        if (window.XMLHttpRequest) {                      // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {                                            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlhttp;
    }

    aja.xhr = aja.createAjax();
    aja.processHandler = function () {
        if(aja.xhr.readyState == 4) {
            if(aja.xhr.status == 200) {
                aja.resultHandler(aja.xhr.responseText);
                aja.addLocalstorageSupport(aja.tarUrl, aja.xhr.responseText); //storage
            }
        }
    }

    /* 增加本地存储支持 */
    aja.addLocalstorageSupport = function (addr, data){
        if(!window.localStorage) return;
    
        var S = window.localStorage;
        function clearLocalStorage (callback) {
            var now = new Date().getTime();
            var i;
            for(i in S){
                try{
                    var item = JSON.parse(S.getItem(i));
                }catch(e){continue;}
                if(!item.deadline) continue;
                if(item.deadline < now) S.removeItem(i);
            }
            callback && callback();
        }
    
        /* 有第二个参数的时候清除过期并存储 */
        if(data) clearLocalStorage(function () {
            var storage = {
                deadline: new Date().getTime() + 10 * 60 * 1000,    //10分钟
                content: data
            }
            S.setItem(addr, JSON.stringify(storage));
        });
        return S.getItem(addr);
    }

    aja.get = function (tarUrl, callbackHandler) {
        var data = aja.addLocalstorageSupport(tarUrl)
        if(data)return callbackHandler(JSON.parse(data).content);

        aja.tarUrl = tarUrl;
        aja.resultHandler = callbackHandler;
        aja.xhr.onreadystatechange = aja.processHandler;
        aja.xhr.open('get', aja.tarUrl, true);
        aja.xhr.send();
    }

    aja.post = function (tarUrl, postString, callbackHandler) {
        aja.tarUrl = tarUrl;
        aja.postString = postString;
        aja.resultHandler = callbackHandler;
        aja.xhr.onreadystatechange = aja.processHandler;
        aja.xhr.open('post', aja.tarUrl, true);
        aja.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        aja.xhr.send(aja.postString);
    }
    return aja;
}
exports.Ajax = Ajax;

});