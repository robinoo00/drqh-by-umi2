import * as DiscoverServices from '../services/tpl'
import config from "../../../utils/config";

let loading = false;

export default {
    namespace: 'guide',
    state: {
        list: [],
        page: 0,
        nomore: false
    },
    subscriptions: {
        setup({dispatch, history}) {
            // return history.listen(({pathname, query}) => {
            //     if (pathname === '/guide' && sessionStorage.getItem(config.KEY)) {
            //         dispatch({
            //             type: 'getList'
            //         })
            //     }
            // })
        },
    },

    effects: {
        * getList({page = 1}, {call, put}) {
            const {data} = yield call(DiscoverServices.getList, {type: '风险提示', page: page, pageSize: 10})
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
                const page = yield select(state => state.discover.page);
                const nomore = yield select(state => state.discover.nomore);
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
