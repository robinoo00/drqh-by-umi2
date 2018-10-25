import * as InServices from '../services/introduce'
import config from '../../../utils/config'

export default {
    namespace: 'introduce',
    state: {
        con:''
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/introduce'){
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
            const {data} = yield call(InServices.getDetail,{id:id,cid:localStorage.getItem(config.KEY)});
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
