import * as TplServices from '../services/tpl'
import {Toast} from 'antd-mobile'
import router from 'umi/router'
import config from "../../../utils/config";

export default {
    namespace: 'helpAsk',
    state: {
        type_list:[
            '账户问题',
            '交易问题',
            '结算问题',
            '我要投诉',
            '意见反馈',
            '其他问题',
        ],
        type:0,
        content:'',
        files:[]
    },
    subscriptions: {},

    effects: {
        *ask({},{call,put,select}){
            Toast.loading('提交中',0);
            const type = yield select(state => state.helpAsk.type);
            const content = yield select(state => state.helpAsk.content);
            const files = yield select(state => state.helpAsk.files);
            if(type === 0){
                Toast.info('请选择留言类型');
                return;
            }
            if(content === ""){
                Toast.info('请输入留言内容');
                return;
            }
            let formData = new FormData();
            formData.append('type',type);
            formData.append('content',content);
            if(files.length != 0){
                for(let i = 0; i<files.length; i++){
                    formData.append('pic'+i,files[i]['file']);
                }
            }
            formData.append('key',localStorage.getItem(config.KEY));
            formData.append('cid',localStorage.getItem(config.CID));
            formData.append('account',localStorage.getItem(config.ACCOUNT));
            const {data} = yield call(TplServices.ask,formData)
            if(data){
                if(data.状态){
                    Toast.info('提交成功，客服会尽快答复您，请等待');
                    router.goBack();
                }
            }else{
                Toast.info('提交失败');
            }
        }
    },

    reducers: {
        assignFiles(state,{files}){
            return{
                ...state,
                files:files
            }
        },
        assignType(state,{value}){
            return {
                ...state,
                type:value
            }
        },
        assignContent(state,{content}){
            return {
                ...state,
                content:content
            }
        }
    },

};
