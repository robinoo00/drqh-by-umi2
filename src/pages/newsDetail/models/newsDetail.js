import config from "../../../utils/config";
import * as NewsDetailServices from '../services/newsDetail';

export default {
    namespace: 'newsDetail',
    state: {
        type: '',
        header_title: '',
        inner_title: '',
        con: ''
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/newsDetail') {
                    if (typeof query.type != 'undefined') {
                        const type = query.type;
                        dispatch({
                            type: 'assignType',
                            value: type
                        })
                    }else{
                        dispatch({
                            type: 'assignType',
                            value: ''
                        })
                    }
                }
            })
        }
    },
    reducers: {
        assignType(state, {value}) {
            return {
                ...state,
                type: value
            }
        },
        assignData(state, {header_title, inner_title, con}) {
            return {
                ...state,
                header_title: header_title,
                inner_title: inner_title,
                con: con,
            }
        }
    },
    effects: {
        * getDetail({}, {call, select, put}) {
            const type = yield select(state => state.newsDetail.type);
            if (type === '') {
                yield put({
                    type: 'assignData',
                    header_title: '详情',
                    inner_title: sessionStorage.getItem(config.NEW_TITLE),
                    con: sessionStorage.getItem(config.NEW_CON)
                })
            }
            //产品相关介绍
            if (type === config.NEWS_PROD) {
                const {data} = yield call(NewsDetailServices.getNewsDetail, {id: 7});
                if (data) {
                    yield put({
                        type: 'assignData',
                        header_title: data.标题,
                        inner_title: '',
                        con: data.内容,
                    })
                }
            }
            //免责及隐私声明
            if (type === config.NEWS_SECRET) {
                // const {data} = yield call(NewsDetailServices.getNewsDetail, {id: 8});
                const data = {
                    标题:'隐私声明',
                    内容:'尽管互联网信息传播可能在某些区域会与当地法律产生冲突，用户应该了解德润期货网站所包含的信息不是向任何特定国家发布的，也不针对公众中的特别成员或位于特定国家的公民。 德润期货高级货币市场尊重个人隐私权。德润期货保证，通过德润期货网站收集的任何包含用户身份、地址、出生日期、电话号码以及其它与用户有关的个人信息，将一直由德润期货保存并且不会在未经用户事先同意的情况下交换、出售或出示给任何第三方。'
                }
                if (data) {
                    yield put({
                        type: 'assignData',
                        header_title: data.标题,
                        inner_title: '',
                        con: data.内容,
                    })
                }
            }
        }
    }
}
