import config from "../../../utils/config";
import * as HelpServices from "..//services/tpl";

export default {
    namespace: 'helpDetail',
    state: {
        con:''
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/helpDetail'){
                    dispatch({
                        type:'getDetail',
                        id:query
                    })
                }
            })
        },
    },

    effects: {
        *getDetail({id},{call,put}){
            const {data} = yield call(HelpServices.getDetail,{id:id,cid:localStorage.getItem(config.KEY)});
            yield put({
                type:'assignCon',
                con:data.内容
            })
        }
    },

    reducers: {
        assignCon(state,{con}){
            return {
                ...state,
                con:con
            }
        }
    },

};
