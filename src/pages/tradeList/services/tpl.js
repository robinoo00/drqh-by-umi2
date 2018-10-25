import request from '../../../utils/request'
import config from '../../../utils/config'

/*
* 合约2
方向3
手数4
均价5
盈亏7
保证金6
* */
export function getPositionList(values){
    return request(config.server + 'holding',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

export function getDealList(values){
    return request(config.server + 'yichejiao',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
export function getPingList(values){
    return request(config.server + 'pingchanglist',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

export function getUnDealList(values){
    return request(config.server + 'nodeal',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
export function getHistoryList(values){
    return request(config.server + 'lishichenjiao',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
/*
* 买卖接口说明
* order
* key
* instrument 品种（参数名为 合约）
* direction 方向 0 买 1 卖 平买为1 平卖为0
* offset
*   0 开仓（点击 买 卖时 皆为 0）
*   1平今 点击平买 平卖 时候 得先调用平仓接口
*   3平昨 点击平买 平卖 时候 得先调用平仓接口
* volume 数量
* */
export function order(values){
    return request(config.server + 'order',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values,
    })
}
/*
* 平仓接口说明
*findchichang
* key
* pz 品种
* fx 方向 0 买 1 卖
* 返回结果 ret.今仓 == true  ret.昨仓 == false
* 今仓 true offset 为1
* 今仓 false offset 为3
* */
export function getOffect(values){
    return request(config.server + 'holdingcoms',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values,
    })
}
//撤单(未成交)
export function cancel(values){
    return request(config.server + 'chedan',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
//止损止盈(持仓)
export function limitEarn(values){
    return request(config.server + 'addtpsi',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

