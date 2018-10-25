import * as ModifyServices from '../services/tpl'
import {Toast} from 'antd-mobile'
import router from 'umi/router'

export default {
    namespace: 'myInfoModify',
    state: {
        title:'修改登录密码'
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/'){

                }
            })
        },
    },

    effects: {
        *passModify({values},{call,put}){
            const {data} = yield call(ModifyServices.passModify,values);
            if(data){
                Toast.info(data.信息);
                if(data.状态){
                    router.push({
                        pathname:'/myInfo'
                    })
                }
            }
        }
    },

    reducers: {

    },

};
