import {Badge} from 'antd-mobile'
import * as FollowListServices from '../services/followList'
import {Toast} from 'antd-mobile'

export default {
    namespace:'followList',
    state:{
        tabs:[
            {title:'正在跟随',num:0,choose:true},
            {title:'已取消跟随',num:0,choose:true}
        ],
        follow_list:[]
    },
    subscriptions:{},
    reducers:{
        assignFollowList(state,{data}){
            return {
                ...state,
                follow_list:data
            }
        },
        // assignTabsNum(state,{num,index}){
        //     let tabs = state.tabs;
        //     tabs[index][num] = num;
        // }
    },
    effects:{
        *getList({},{call,put}){
            const {data} = yield call(FollowListServices.getList,{});
            if(data){
                if(typeof data.状态 !='undefined'){
                    if(!data.状态){
                        Toast.info(data.信息)
                    }
                }else{
                    yield put({
                        type:'assignFollowList',
                        data:data.data
                    })
                }

            }
        }
    }
}
