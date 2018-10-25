import request from '../../../utils/request'
import config from '../../../utils/config'

export function sendCode(values){
    return request(config.server + 'regcode',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
/*校验验证码*/
export function valCode(values) {
    return request(config.server + 'Gcode',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

/*校验手机号*/
export function valPhone(values) {
    return request(config.server + 'Gphone',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
/*校验推荐号*/
export function valGid(values) {
    return request(config.server + 'GID',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
/*校验身份证*/
export function valIDCode(values) {
    return request(config.server + 'Gsfz',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}


export function getArea() {
    return request('./cityData.min.json',{
        method:'GET'
    });
}

export function submit(values) {
    return fetch(config.server + 'regact',{
        method: 'POST',
        body: values
    }).then(checkStatus)
        .then(parseJSON).then(data => ({data})).catch(err => ({err}));
}
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.json();
}
