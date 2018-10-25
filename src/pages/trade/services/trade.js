import request from '../../../utils/request'
import config from '../../../utils/config'

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
export function limitOrder(values) {
    return request(config.server + 'zdjorder',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values,
    })
}
