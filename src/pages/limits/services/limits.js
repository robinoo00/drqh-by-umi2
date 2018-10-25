import request from '../../../utils/request'
import config from '../../../utils/config'

export function getList(values){
    return request(config.server + 'gettpsllist',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
export function cancel(values){
    return request(config.server + 'deltpsl',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
export function add(values){
    return request(config.server + 'addtpsi',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
export function modify(values){
    return request(config.server + 'tpslmodify',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
