import * as services from '../services/bankEdit'
import config from "../../../utils/config";
import {Toast,Modal} from 'antd-mobile'
import router from 'umi/router'

export default {
    namespace:'bankEdit',
    state:{},
    setup:{},
    reducers:{},
    effects:{
        *submit({bank,bankno,pass},{call}){
            Toast.loading('提交中',0);
            const {data} = yield call(services.bankEdit,{bank,bankno,pass});
            if(data){
                Toast.hide();
                if (data.状态) {
                    Modal.alert('', data.信息, [
                        {
                            text: '确定', onPress: () => {
                                router.push({pathname: '/banks'})
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
            }
        }
    }
}
