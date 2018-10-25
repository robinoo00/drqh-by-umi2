import request from '../../../utils/request'
import config from '../../../utils/config'

//产品相关介绍
export function getNewsDetail(values){
    return request(config.server + 'newslook',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
