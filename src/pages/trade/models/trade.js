import config from '../../../utils/config'
import * as TradeServices from '../services/trade'
import {Modal, Toast} from 'antd-mobile'

const prompt = Modal.prompt;

export default {
    namespace: 'trade',
    state: {
        price_type: 1,//1 市价 2 限价
        num: 1,
        list: [],
        code: '',
        code_name: '',
        ping_num: 0,
        limit_price: 0,
        no_trade: false,//非交易时间段
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/trade' && localStorage.getItem(config.KEY)) {
                    if (query.code) {
                        dispatch({
                            type: 'assignCode',
                            code: query.code
                        })
                        dispatch({
                            type: 'getList'
                        })
                        sessionStorage.setItem(config.TRADE_CODE, query.code);
                    }
                }
            })
        },
    },

    effects: {
        * newOrder({direction,code, price = 0,num = 0,price_type='市价'}, {call, put, select}) {
            const post_data = {
                symbol: code,
                Buysell: direction,
                Qty: num,
                Price:price,
                Ordertype: price_type
            }
            const {data} = yield call(TradeServices.order, post_data);
            if (data) {
                if (data.信息 === 'api error') {
                    window.toast('交易失败')
                } else {//交易成功
                    document.getElementById('trade-video').play();//来段music
                    yield put({
                        type:'getPingNum'
                    })
                    if(data.信息.length > 4){
                        Modal.alert('提示',data.信息,[
                            {text:'我已知晓',onPress:() => {

                                }}
                        ])
                        window.hideAll();
                    }else{
                        window.toast(data.信息)
                    }
                }
            } else {
                window.toast('交易失败')
            }
            Toast.hide();
        },
        * order({direction, price = 0,num = 0}, {call, put, select}) {
            const price_type = yield select(state => state.trade.price_type);
            const limit_price = yield select(state => state.trade.limit_price);
            const code = yield select(state => state.trade.code);
            if(num === 0){
                num = yield select(state => state.trade.num);
            }
            yield put({
                type:'newOrder',
                direction:direction,
                code:code,
                price:price_type === 1 ? price : limit_price,
                num:num,
                price_type: price_type === 1 ? "市价" : "限价"
            })
        },
        * ping({code = ''}, {put, call, select}) {
            if(!code){
                code = yield select(state => state.trade.code);
            }
            const {data} = yield call(TradeServices.getOffect, {symbol: code});
            if (data) {
                if (data.手数 === 0) {
                    window.toast('还未持仓');
                    Toast.hide();
                } else {
                    yield put({
                        type: 'order',
                        direction: data.方向 === "买入" ? "卖出" : "买入",
                        num:data.手数
                    })
                }
            } else {
                Toast.info('交易失败');
                Toast.hide();
            }

        },
        //顶部下拉列表
        * getList({}, {put, select}) {
            let list = yield select(state => state.home.list);
            const code = yield select(state => state.trade.code);
            if (list.length == 0) {
                list = JSON.parse(sessionStorage.getItem(config.K_DATA_LIST));
            }
            if (list && code) {
                const code_name = list.filter(item => item.合约 === code)[0]['名称'];
                yield put({
                    type: 'assignList',
                    data: list
                })
                yield put({
                    type: 'assignCodeName',
                    name: code_name
                })
            }
        },
        //获取平买 平卖数量
        * getPingNum({}, {select, put, call}) {
            const no_trade = yield select(state => state.trade.no_trade);
            if (!no_trade) {
                const code = yield select(state => state.trade.code);
                const {data} = yield call(TradeServices.getOffect, {symbol: code});
                if (data) {
                    yield put({
                        type: 'assignPingNum',
                        num: data.手数,
                    })
                } else {
                    yield put({
                        type: 'assignNoTrade',
                        bool: true
                    })
                }
            }
        }
    },

    reducers: {
        assignLimitPirce(state, {price}) {
            return {
                ...state,
                limit_price: price
            }
        },
        assignNoTrade(state, {bool}) {
            return {
                ...state,
                no_trade: bool
            }
        },
        assignPingNum(state, {num}) {
            return {
                ...state,
                ping_num: num,
            }
        },
        assignCodeName(state, {name}) {
            return {
                ...state,
                code_name: name
            }
        },
        assignNum(state, {num}) {
            num = num <= 1 ? 1 : num;
            return {
                ...state,
                num: num
            }
        },
        assignCode(state, {code}) {
            return {
                ...state,
                code: code
            }
        },
        assignList(state, {data}) {
            data.map(item => {
                item['label'] = item.名称
                item['value'] = item.合约
            });
            return {
                ...state,
                list: data
            }
        },
        assignPriceType(state, {value}) {
            return {
                ...state,
                price_type: value
            }
        },
    },

};
