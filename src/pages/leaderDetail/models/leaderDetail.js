import * as LeaderDetailServices from '../services/leaderDetail'
import {randomColor} from "../../../utils/common";
import {Toast} from 'antd-mobile'

const colors = [
    "rgb(255, 202, 30)",
    "rgb(227, 168, 220)",
    "rgb(108, 177, 240)",
    "rgb(203, 219, 29)",
    "rgb(231, 152, 152)",
    "rgb(135, 160, 204)",
    "rgb(255, 148, 43)",
    "rgb(209, 228, 231)",
    "rgb(241, 192, 163)",
    "rgb(241, 232, 191)",
]

export default {
    namespace: 'leaderDetail',
    state: {
        tabs: [
            {title: '数据统计'},
            {title: '当前交易'},
            {title: '历史交易'}
        ],
        data: [],
        current: [],
        id: 0
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/leaderDetail') {
                    // Toast.loading('123',0);
                    const id = query.id;
                    dispatch({
                        type: 'assignData',
                        data: [],
                    })
                    dispatch({
                        type: 'assignCurrent',
                        data: [],
                    })
                    dispatch({
                        type: 'assignId',
                        id: id
                    })
                    dispatch({
                        type: 'getList',
                        id: id
                    })
                }
            })
        }
    },
    reducers: {
        assignCurrent(state, {data}) {
            return {
                ...state,
                current: data
            }
        },
        assignId(state, {id}) {
            return {
                ...state,
                id: id
            }
        },
        assignData(state, {data}) {
            return {
                ...state,
                data: data,
            }
        }
    },
    effects: {
        * getCurrentTrade({}, {select, call, put}) {
            const id = yield select(state => state.leaderDetail.id);
            if (id != 0) {
                const {data} = yield call(LeaderDetailServices.getCurrentTrade, {tid: id});
                if (data && data.data.length != 0) {
                    yield put({
                        type:'assignCurrent',
                        data:data.data
                    })
                }
            }
        },
        * getList({id}, {put, call}) {
            const {data} = yield call(LeaderDetailServices.getList, {tid: id});
            data.品种统计 = JSON.parse(data.品种统计);
            data.平仓记录 = JSON.parse(data.平仓记录);
            data.品种统计.map((item, index) => {
                if (typeof colors[index] != 'undefined') {
                    item['color'] = colors[index];
                } else {
                    item['color'] = randomColor();
                }
            })
            yield put({
                type: 'assignData',
                data: data
            })
        }
    }
}
