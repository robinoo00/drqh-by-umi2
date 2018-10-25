import * as WithDrawServices from '../services/tpl'
import config from '../../../utils/config'
import {Toast,Modal} from 'antd-mobile'
import router from 'umi/router'

export default {
    namespace: 'withdraw',
    state: {
        list:[
            {title:'金额',name:'money'},
        ]
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
        *withdraw({money,pass},{call,put}){
            Toast.loading('提交中',0);
            const {data} = yield call(WithDrawServices.withdraw,{pass,money})
            if(data){
                Toast.hide();
                if (data.状态) {
                    Modal.alert('', '申请出金成功，将在二小时内出金至您的银行卡,请勿重复申请', [
                        {
                            text: '确定', onPress: () => {
                                router.push({pathname: '/personal'})
                            }
                        }
                    ])
                }else{
                    Modal.alert('', data.信息, [
                        {
                            text: '确定', onPress: () => {}
                        }
                    ])
                }
                // Toast.info(data.信息,2);
                // if(data.状态){
                //     setTimeout(() => {
                //         router.push({pathname:'/personal'})
                //     },2000)
                // }
            }
        }
    },

    reducers: {

    },

};
