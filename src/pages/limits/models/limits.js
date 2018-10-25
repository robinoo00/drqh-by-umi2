import * as LimitServices from '../services/limits'
import {Toast} from 'antd-mobile'

let loading = false;

export default {
    namespace: 'limits',
    state: {
        code: '',
        nav_show: false,
        nav_choose: '充值',
        nav_list: [
            {title: '充值', choose: true},
            {title: '提现', choose: false},
            {title: '收入', choose: false},
            {title: '支出', choose: false},
        ],
        list: [],
        page: 0,
        nomore: false,
        tempdata: {},
        limit_earn: {
            inputs:[
                {
                    text:'手数',placeholder:'请输入手数',name:'qty',value:''
                },
                {
                    text:'止损价',placeholder:'请输入止损价',name:'slprice',value:''
                },
                {
                    text:'止盈价',placeholder:'请输入止盈价',name:'tpprice',value:''
                },
            ],
            data: {},
            visible: false,
            visibleAdd: false,
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/limits') {
                    if (query.code) {
                        dispatch({
                            type: 'assignCode',
                            code: query.code
                        })
                    }
                }
            })
        },
    },

    effects: {
        * getList({page = 1}, {call, put, select}) {
            const code = yield select(state => state.limits.code);
            const {data} = yield call(LimitServices.getList,{page:page,symbol:code})
            loading = false;
            if(data){
                if(typeof data.状态 !='undefined' && !data.状态){
                    if(!data.状态){
                        Toast.info(data.信息,1);
                        return;
                    }
                }
                yield put({
                    type:'assignList',
                    data:data,
                    page:page
                })
            }
        },
        * loadMore({}, {put, select}) {
            if (!loading) {
                const page = yield select(state => state.limits.page);
                const nomore = yield select(state => state.limits.nomore);
                if (!nomore) {
                    yield put({
                        type: 'getList',
                        page: page + 1
                    })
                }
                loading = true;
            }
        },
        * add({qty,tpprice=0,slprice=0}, {call, select, put}) {
            const item = yield select(state => state.limits.tempdata)
            const post_data = {
                symbol:item.合约,
                buysell:item.方向,
                qty:qty,
                tpprice:tpprice,
                slprice:slprice,
            }
            const {data} = yield call(LimitServices.add, post_data)
            if (data) {
                Toast.info(data.信息,1)
                yield put({
                    type: 'hideLimitEarn'
                })
            }
        },
        * modify({qty,tpprice = 0,slprice = 0}, {call, select, put}) {
            const item = yield select(state => state.limits.limit_earn.data)
            const post_data = {
                symbol:item.Symbol,
                buysell:item.Buysell,
                qty:qty,
                tpprice:tpprice,
                slprice:slprice,
                tpid:item.id
            }
            const {data} = yield call(LimitServices.modify, post_data)
            if (data) {
                Toast.info(data.信息,1)
                yield put({
                    type: 'hideLimitEarn'
                })
            }
        },
        *cancel({id},{call,put}){
            const {data} = yield call(LimitServices.cancel,{tpid:id});
            if(data){
                Toast.info(data.信息,1)
                if(data.状态){
                    yield put({
                        type:'cancelLimit',
                        id:id
                    })
                }
            }
        }
    },

    reducers: {
        cancelLimit(state,{id}){
            const list = state.list;
            for(let index in list){
                if(list[index]['id'] === id){
                    list.splice(index,1);
                }
            }
            return {
                ...state,
                list:[...list]
            }
        },
        assignTempData(state, {data}) {
            return {
                ...state,
                tempdata: data,
            }
        },
        assignLimitEarnData(state, {data}) {
            return {
                ...state,
                limit_earn: {
                    ...state.limit_earn,
                    data: data
                }
            }
        },
        showLimitEarnAdd(state, {}) {
            return {
                ...state,
                limit_earn: {
                    ...state.limit_earn,
                    visibleAdd: true
                }
            }
        },
        showLimitEarn(state, {data}) {
            return {
                ...state,
                limit_earn: {
                    ...state.limit_earn,
                    visible: true
                }
            }
        },
        assignInputsValue(state,{data = null}){
            let inputs = state.limit_earn.inputs;
            if(data){
                inputs[0]['value'] = data['qty']
                inputs[1]['value'] = data['slPrice']
                inputs[2]['value'] = data['tpPrice']
            }else{
                inputs[0]['value'] = ''
                inputs[1]['value'] = ''
                inputs[2]['value'] = ''
            }
            return {
                ...state,
                list_earn:{
                    ...state.limit_earn,
                    inputs:[...inputs]
                }
            }
        },
        hideLimitEarn(state, {}) {
            return {
                ...state,
                limit_earn: {
                    ...state.limit_earn,
                    visible: false,
                    visibleAdd: false
                }
            }
        },
        assignCode(state, {code}) {
            return {
                ...state,
                code: code
            }
        },
        assignList(state, {data, page}) {
            let nomore = false;
            if (data.length === 0 || data.length < 30) {
                nomore = true;
            }
            if (page === 1) {
                return {
                    ...state,
                    list: data,
                    page: 1,
                    nomore: nomore
                }
            } else {
                return {
                    ...state,
                    list: [...state.list, ...data],
                    page: page,
                    nomore: nomore
                }
            }
        },
        toggleShow(state) {
            return {
                ...state,
                nav_show: !state.nav_show
            }
        },
        assignChoose(state, {index}) {
            let temp = [
                {title: '充值', choose: false},
                {title: '提现', choose: false},
                {title: '收入', choose: false},
                {title: '支出', choose: false},
            ];
            temp[index]['choose'] = true;
            return {
                ...state,
                nav_choose: temp[index]['title'],
                nav_list: [...temp]
            }
        }
    },

};
