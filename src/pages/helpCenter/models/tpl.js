import * as TplServices from '../services/tpl'

let loading = false;

export default {
    namespace: 'helpCenter',
    state: {
        list: [],
        page: 0,
        nomore: false
    },
    subscriptions: {},

    effects: {
        * getList({page = 1}, {call, put}) {
            const {data} = yield call(TplServices.getList, {page: page, pagesize: 10})
            loading = false;
            if(data){
                yield put({
                    type: 'assignList',
                    data: data.Rows,
                    page: page
                })
            }
        },
        * loadMore({}, {call, put, select}) {
            if (!loading) {
                const page = yield select(state => state.helpCenter.page);
                const nomore = yield select(state => state.helpCenter.nomore);
                if (!nomore) {
                    yield put({
                        type: 'getList',
                        page: page + 1
                    })
                }
                loading = true;
            }
        }
    },

    reducers: {
        assignList(state, {data, page}) {
            let nomore = false;
            if (data.length === 0 || data.length < 10) {
                nomore = true;
            }
            if(page === 1){
                return {
                    ...state,
                    list:data,
                    page:1,
                    nomore:nomore
                }
            }else{
                return {
                    ...state,
                    list:[...state.list,...data],
                    page:page,
                    nomore:nomore
                }
            }
        }
    },

};
