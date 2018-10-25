import config from "../../../utils/config";
import * as PayServices from '../services/tpl';
import {Modal,Toast} from 'antd-mobile'

export default {
    namespace: 'pay',
    state: {
        type:'alipay',
        headerText:'银联支付',
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/pay' && localStorage.getItem(config.KEY)){
                    dispatch({
                        type:'assignType',
                        way:query.type
                    })
                }
            })
        },
    },

    effects: {
        *submit({params},{call,put}){
            const {data} = yield call(PayServices.pay,params);
            if(data){
                Modal.alert('提示',data.信息,[
                    {text:'我知道了',onPress:() => {}}
                ])
            }
        }
    },

    reducers: {
        assignType(state,{way}){
            let text = '';
            if(way === 'alipay'){
                text = '银联支付'
            }
            if(way === 'payunion'){
                text = '银行转账'
            }
            return{
                ...state,
                type:way,
                headerText:text
            }
        }
    },

};
