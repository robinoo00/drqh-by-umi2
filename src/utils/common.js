import {Modal} from 'antd-mobile'
//滚动加载
import config from "./config";

let temp = null;

export function scrollLoadMore(callback) {
    setTimeout(() => {
        // window.addEventListener('scroll', () => {loadMore(callback)})
        temp = () => {
            loadMore(callback)
        };
        window.addEventListener('scroll', temp)
    }, 200)
}

//取消滚动监听
export function removeScrollListener() {
    // window.removeEventListener('scroll',loadMore);
    window.removeEventListener('scroll', temp);
}

//滚动加载
function loadMore(callback) {
    const scrollPos = getScrollPos()
    // console.log('scrollPos', scrollPos)
    // console.log('scrollHeight', document.body.scrollHeight)
    // console.log('clientHeight', document.body.clientHeight)
    if ((scrollPos + document.body.clientHeight) === document.body.scrollHeight) {
        callback && callback();
    }
}

//获取滚动位置
export function getScrollPos() {
    let scrollPos = 0;
    if (typeof window.pageYOffset !== 'undefined') {
        scrollPos = window.pageYOffset;
    }
    else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    }
    else if (typeof document.body !== 'undefined') {
        scrollPos = document.body.scrollTop;
    }
    return scrollPos;
}

//获取时间
export function getFormatTime(stampTime = (new Date()).getTime(), string = 'yyyy-MM-dd') {
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,         //月份
            "d+": this.getDate(),          //日
            "h+": this.getHours(),          //小时
            "m+": this.getMinutes(),         //分
            "s+": this.getSeconds(),         //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()       //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                    ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    return new Date(stampTime).Format(string);
}

//复制到剪切板
export function copyToClipboard(text) {
    if (text.indexOf('-') !== -1) {
        let arr = text.split('-');
        text = arr[0] + arr[1];
    }
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板';
        alert(msg);
    } catch (err) {
        alert('该浏览器不支持点击复制到剪贴板');
    }
    document.body.removeChild(textArea);
}

//随机颜色
export function randomColor() {
    // Math.floor(Math.random()*(max-min+1)+min);
    // var r=Math.floor(Math.random()*256);
    // var g=Math.floor(Math.random()*256);
    // var b=Math.floor(Math.random()*256);
    var r = Math.floor(Math.random() * (255 - 130 + 1) + 130);
    var g = Math.floor(Math.random() * (255 - 130 + 1) + 130);
    var b = Math.floor(Math.random() * (255 - 130 + 1) + 130);
    return "rgb(" + r + ',' + g + ',' + b + ")";
}

/*
* 获取URL参数
* name 参数名
* */
export function getvl(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(window.location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};

//发送K线数据请求
export function chooseKType(code, type = '分时') {
    var work = window.$.connection.myHub;
    window.$.connection.hub.url = 'http://106.14.126.147:1008/lcc';
    window.$.connection.hub.start().done(function () {
        work.server.k线(code, type, "");
    });
}

//购买询问
export function ifSwitch (title, callback){
    if (localStorage.getItem(config.TRADE_SWITCH) === null || localStorage.getItem(config.TRADE_SWITCH) === "true") {
        Modal.alert(title, '', [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '确定', onPress: () => {
                    callback && callback();
                }
            }
        ])
    } else {
        callback && callback();
    }
}

/*小数相加*/
export function accAdd(num1, num2){
    var sq1,sq2,m;
    try {
        sq1 = num1.toString().split(".")[1].length;
    }
    catch (e) {
        sq1 = 0;
    }
    try {
        sq2 = num2.toString().split(".")[1].length;
    }
    catch (e) {
        sq2 = 0;
    }
    const sq = sq1 > sq2 ? sq1 : sq2
    return (num1 + num2).toFixed(sq)
}
