// import request from '../../../utils/request'
import config from '../../../utils/config'

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
export async function getKData(values){
    const url = `http://106.14.7.216:1010/api/api/getk?contract=${values.contract}&type=${values.type}&time=${values.time}`
    return fetch(url)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            return {data:data};
        })
        .catch(err => {
            console.log(err);
            return {data:''}
        });
    // return request(`http://106.14.126.147:1010/api/api/getk?contract=${values.contract}&type=${values.type}&time=${values.time}`,{
    //     method:'GET',
    // })
}

