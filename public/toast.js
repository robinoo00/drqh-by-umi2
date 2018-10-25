"use strict"
var toastName = 'toast',loadingName = 'window_loading',maskName = 'window_mask';
var body = document.getElementsByTagName('body')[0];
function toast(text,duration) {
    hideAll()
    if(typeof duration === 'undefined'){
        duration = 1000;
    }
    var has = document.getElementById('toast');
    if(has === null){
        var wrap = document.createElement('div');
        wrap.innerHTML = '<div class="window_toast" id="toast"></div>';
        body.appendChild(wrap);
    }
    var item  = document.getElementById('toast');
    item.innerText = text;
    item.style.display = 'block';
    setTimeout(function () {
        hideAll()
    }, duration)
}
function loading(text,duration,mask){
    hideAll();
    if(typeof duration === 'undefined'){
        duration = 1000;
    }
    if(typeof mask === 'undefined'){
        mask = true;
    }
    var has = document.getElementById(loadingName);
    if(has === null){
        var wrap = document.createElement('div');
        wrap.innerHTML = '<div class="window_toast" id='+loadingName+'>\n' +
            '    <img src="./loading.png" alt="" class="window_loading">\n' +
            '    <p>'+text+'</p>\n' +
            '</div>';
        body.appendChild(wrap);
    }
    if(mask){
        addMask()
    }
    var item  = document.getElementById(loadingName);
    item.style.display = 'block';
    if(duration != 0){
        setTimeout(function () {
            hideAll()
        }, duration)
    }
    if(duration === 0){
        setTimeout(function () {
            hideAll()
        }, 15000)
    }
}
function hideAll(){
    var toastItem = document.getElementById(toastName);
    var loadingItem = document.getElementById(loadingName);
    var maskItem = document.getElementById(maskName);
    if(toastItem != null){
        toastItem.style.display = 'none';
    }
    if(loadingItem != null){
        loadingItem.style.display = 'none';
    }
    if(maskItem != null){
        maskItem.style.display = 'none';
    }
}
function addMask() {
    var has = document.getElementById(maskName);
    if(has === null){
        var wrap = document.createElement('div');
        wrap.innerHTML = '<div class="window_mask" id="window_mask"></div>';
        body.appendChild(wrap);
    }
    var maskItem  = document.getElementById(maskName);
    maskItem.style.display = 'block';
}
