import * as FollowEditServices from '../services/followEdit'
import {Toast} from 'antd-mobile'
import router from 'umi/router'
import config from "../../../utils/config";

export default {
    namespace: 'followEdit',
    state: {
        id: 0,
        nickname: '',
        way: '固定手数',//跟随方式
        direct: 0,//跟随方向 0 正向 1 反向
        num: 1,//固定手数
        num1: 1,//固定倍数
        edit: false,
        editId: 0
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/followEdit') {
                    const from = query.from;
                    //记录被追随者昵称
                    const nickname = query.nickname;
                    dispatch({
                        type: 'assignItem',
                        name: 'nickname',
                        value: nickname
                    });
                    //跟随
                    if (from === config.FOLLOW_TYPE_ADD) {
                        const id = query.id;
                        dispatch({
                            type:'assignItem',
                            name:'id',
                            value:id
                        })
                        dispatch({
                            type: 'assignItem',
                            name: 'edit',
                            value:false
                        });
                    }
                    //编辑跟随
                    if (from === config.FOLLOW_TYPE_EDIT) {
                        const fid = query.fid;
                        dispatch({
                            type:'assignItem',
                            name:'editId',
                            value:fid
                        });
                        dispatch({
                            type: 'assignItem',
                            name: 'edit',
                            value:true
                        });
                        dispatch({
                            type:'getFollow'
                        });
                    }
                }
            })
        }
    },
    reducers: {
        init(state,{}){
            state = {
                id: 0,
                nickname: '',
                way: '固定手数',//跟随方式
                direct: 0,//跟随方向 0 正向 1 反向
                num: 1,//固定手数
                num1: 1,//固定倍数
                edit: false,
                editId: 0
            };
            return {
                ...state
            }
        },
        assignItem(state,{name,value}){
          state[name] = value;
          return {
              ...state
          }
        },
        assignDataFromLeadersEdit(state,{data}){
            return {
                ...state,
                way: data.FixedQty === "0" ? "固定倍数" : "固定手数",
                direct: data.Direction === "正向" ? 0 : 1,
                num: data.FixedQty === "0" ? 1 :data.FixedQty,
                num1: data.Times,
            }
        },
        assignData(state, {data}) {
            return {
                ...state,
                way: data.固定手数 === "0" ? "固定倍数" : "固定手数",
                direct: data.方向 === "正向" ? 0 : 1,
                num: data.固定手数 === "0" ? 1 : data.固定手数,
                num1: data.倍数,
                editId: data.记录ID,
            }
        },
        assignNum(state, {value}) {
            const way = state.way;
            if(way === "固定手数"){
                state['num'] = value;
            }
            if(way === "固定倍数"){
                state['num1'] = value;
            }
            return {
                ...state,
            }
        },
    },
    effects: {
        * getFollow({}, {call,select,put}) {
            const fid = yield select(state => state.followEdit.editId);
            const {data} = yield call(FollowEditServices.getFollow, {id: fid});
            if(data){
                yield put({
                    type:'assignDataFromLeadersEdit',
                    data:data,
                })
            }
        },
        * removeFollow({}, {call, select}) {
            const editId = yield select(state => state.followEdit.editId);
            const {data} = yield call(FollowEditServices.removeFollow, {id: editId});
            Toast.hide();
            if (data) {
                Toast.info(data.信息);
                if (data.状态) {
                    router.push('followList')
                }
            }
        },
        * follow({}, {call, select}) {
            const stateData = yield select(state => state.followEdit);
            const way = stateData.way;
            const direct = stateData.direct;
            const num = stateData.num;
            const num1 = stateData.num1;
            const id = stateData.id;
            const edit = stateData.edit;
            if (edit) {
                const post_data = {
                    id: stateData.editId,
                    direct: direct,
                    num: way === '固定手数' ? num : 0,
                    num1: num1
                };
                const {data} = yield call(FollowEditServices.editFollow, post_data);
                Toast.hide();
                if (data) {
                    Toast.info(data.信息);
                    if (data.状态) {
                        router.push('followList')
                    }
                }
            } else {
                const post_data = {
                    ID: id,
                    direct: direct,
                    num: way === '固定手数' ? num : 0,
                    num1: num1
                };
                const {data} = yield call(FollowEditServices.addFollow, post_data);
                Toast.hide();
                if (data) {
                    Toast.info(data.信息);
                    if (data.状态) {
                        router.push('followList')
                    }
                }
            }

        }
    }
}
