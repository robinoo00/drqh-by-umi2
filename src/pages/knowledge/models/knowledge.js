import * as KnowledgeServices from '../services/konwledge'
let loading = false;

export default {
    namespace: 'knowledge',
    state: {
        list:[],
        page:0,
        nomore:false
    },
    subscriptions: {
        setup({ dispatch, history }) {
        },
    },

    effects: {
        *getList({page =1},{call,put}){
            const {data} = yield call(KnowledgeServices.getList,{type:'进阶必备',page:page,pageSize:10})
            loading = false;
            if(data){
                yield put({
                    type:'assignList',
                    data:data.Rows,
                    page:page
                })
            }
        },
        *loadMore({},{put,select}){
            if(!loading){
                const page = yield select(state => state.knowledge.page);
                const nomore = yield select(state => state.knowledge.nomore);
                if(!nomore){
                    yield put({
                        type:'getList',
                        page:page + 1
                    })
                }
                loading = true;
            }
        }
    },

    reducers: {
        assignList(state,{data,page}){
            let nomore = false;
            if(data.length === 0 || data.length < 10){
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
