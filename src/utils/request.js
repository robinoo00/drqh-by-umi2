import fetch from 'dva/fetch';
import config from './config'
import router from 'umi/router'
import {Toast} from 'antd-mobile'

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    const key = localStorage.getItem(config.KEY);
    const cid  = localStorage.getItem(config.CID);
    const account  = localStorage.getItem(config.ACCOUNT);
    const api = url.match(/api\/(\S*)?/)[1];
    if(!key && api !='login' && api != 'register' && api !='regcode'){
        router.push('login');
        return {data:''};
    }
    if(!config.UN_SHOW_LOADING_URLS.includes(api)){
        window.loading('',0);
    }

    if (options.type !== 'form' && options.method === 'POST' && typeof options.body !== 'undefined' && typeof options.body === 'object') {
        const body = options.body;
        if (key && cid && account && api !='login' && api !='register') {
            body['key'] = key.replace(/\+/g, '%2B');
            body['cid'] = cid;
            body['account'] = account;
        }
        const keys = Object.keys(body);
        let querystring = '';
        keys.map(key => {
            querystring += key + '=' + body[key] + '&'
        })
        querystring = querystring.substring(0, querystring.length - 1);
        options.body = querystring;
    }
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            if(!config.UN_SHOW_LOADING_URLS.includes(api)){
                window.hideAll();
            }
            return {data:data};
        })
        .catch(err => {
            // window.hideAll();
            console.log(err);
            if (err.toString() == 'TypeError: Failed to fetch') {
                Toast.info('账号异常,请重新登录');
                localStorage.removeItem(config.KEY);
                router.push({
                    pathname: '/login'
                })
                return {data:""};
            }else{
                // Toast.info('连接异常');
                return {data:""};
            }
        });
    // return fetch(url, options)
    //     .then(checkStatus)
    //     .then(parseJSON)
    //     .then(data => ({data}))
    //     .catch(err => ({err}));
}
