import config from "../utils/config";
import router from 'umi/router'
import * as LoginServices from '../pages/login/services/login'
import {Toast} from 'antd-mobile'

export default {
    namespace: 'example',
    state: {},
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                const key = localStorage.getItem(config.KEY);
                const cid = localStorage.getItem(config.CID);
                const {NoTokenPages} = config;
                if(!NoTokenPages.includes(pathname)){
                    if(!key){
                        router.push('/login')
                    }
                }
            })
        },
    },

    effects: {
        // *auttoLogin({},{call}){
        //     const account = localStorage.getItem(config.ACCOUNT);
        //     const password = localStorage.getItem(config.PASSWORD);
        //     const {data} = yield call(LoginServices.Login,{account:account,password:password});
        //     if(data){
        //         localStorage.setItem(config.KEY,data.key);
        //         localStorage.setItem(config.CID,data.cid);
        //         localStorage.setItem(config.ACCOUNT,data.account);
        //     }
        // }
    },

    reducers: {

    },

};
