import request from '../../../utils/request'
import config from '../../../utils/config'

export function getDetail(values){
    return request(config.server + 'newslook',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
