import * as NewsServices from '../services/news'
import config from '../../../utils/config'
import {ListView} from 'antd-mobile'

let loading = false;

export default {
    namespace: 'news',
    state: {
        tabs: [
            {title: '资讯快递', name: 'list_info', choose: true, type: '金融资讯'},
            {title: '财经要闻', name: 'list_finance', choose: false, type: '财经要闻'},
        ],
        list_info: {
            data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list: [],
            page: 0,
            nomore: false
        },
        list_finance: {
            data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list: [],
            page: 0,
            nomore: false
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            // return history.listen(({pathname,query}) => {
            //     if(pathname === '/news' && sessionStorage.getItem(config.KEY)){
            //         dispatch({
            //             type:'getList'
            //         })
            //     }
            // })
        },
    },

    effects: {
        * getList({page = 1}, {call, put, select}) {
            const tabs = yield select(state => state.news.tabs);
            const choose_tab = tabs.filter(item => item.choose)[0];
            const type = choose_tab['type'];
            const {data} = yield call(NewsServices.getList, {type: type, page: page, pageSize: 10})
            loading = false;
            if (data) {
                yield put({
                    type: 'assignList',
                    data: data.Rows,
                    page: page
                })
            }
        },
        * loadMore({}, {put, select}) {
            if (!loading) {
                const tabs = yield select(state => state.news.tabs);
                const choose_tab = tabs.filter(item => item.choose)[0];
                const name = choose_tab.name;
                const page = yield select(state => state.news[name].page);
                const nomore = yield select(state => state.news[name].nomore);
                if (!nomore) {
                    yield put({
                        type: 'getList',
                        page: page + 1
                    })
                }
                loading = true;
            }
        }
    },

    reducers: {
        assignTabs(state, {choose_index}) {
            let tabs = state.tabs;
            tabs.map((item, index) => {
                if (index === choose_index) {
                    item['choose'] = true;
                } else {
                    item['choose'] = false;
                }
            });
            return {
                ...state,
                tabs: [...tabs]
            }
        },
        assignList(state, {data, page}) {
            let nomore = false;
            if (data.length === 0 || data.length < 10) {
                nomore = true;
            }
            const tabs = state.tabs;
            const choose_tab = tabs.filter(item => item.choose)[0];
            const name = choose_tab.name;
            const list = state[name].list;
            let new_list = [];
            if(page === 1 && list.length != 0){
                new_list = list;
            }else{
                new_list = list.concat(data)
            }
            state[name] = {
                data: state[name]['data'].cloneWithRows(new_list),
                list: new_list,
                page: page,
                nomore: nomore
            }
            return {
                ...state,
            }
        }
    },

};
