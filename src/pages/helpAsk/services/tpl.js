import request from '../../../utils/request'
import config from '../../../utils/config'

export function ask(values){
    return fetch(config.server + 'addquestion',{
        method: 'POST',
        body: values
    }).then(checkStatus)
        .then(parseJSON).then(data => ({data})).catch(err => ({err}));
    // return request(config.server + 'addquestion',{
    //     method:'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //     },
    //     body:values
    // })
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

