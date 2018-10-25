import request from '../../../utils/request'
import config from '../../../utils/config'

/*
* srot：排序
* 1赢亏比列倒序，
* 2赢亏比列顺序
* 3总收益倒序，
* 4总收益顺序，
* 5盈利率倒序，
* 6盈利率顺序
* 7跟随人数倒序
* 8跟随人数顺序
* */
export function getList(values){
    return request(config.server + 'top',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
