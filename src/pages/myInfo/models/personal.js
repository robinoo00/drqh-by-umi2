import config from "../../../utils/config";

export default {
    namespace: 'myInfo',
    state: {
        data:{}
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/myInfo' && localStorage.getItem(config.KEY)){
                    dispatch({
                        type:'checkData'
                    })
                }
            })
        },
    },

    effects: {
       *checkData({},{call,put,select}){
           const data = yield select(state => state.personal.info);
           if(data.length === 0){
               yield put({
                   type:'personal/getUserInfo'
               })
           }
       }
    },

    reducers: {

    },

};
