import * as LeadersServices from '../services/leaders'

let loading = false;

export default {
    namespace: 'leaders',
    state: {
        tabs: [
            {title: "收益高手", choose: false, sort: 'desc', srot: 3,name:'list_earn'},
            {title: "常胜高手", choose: true, sort: 'desc', srot: 5,name:'list_win'},
            {title: "人气高手", choose: false, sort: 'desc', srot: 7,name:'list_hot'},
        ],
        type_choose:'一周',
        list_earn: {//总收益(收益高手)
            list: [],
            nomore: false,
            page: 0,
            empty: false
        },
        list_win: {//盈亏比例(常胜高手)
            list: [],
            nomore: false,
            page: 0,
            empty: false
        },
        list_hot: {//跟随人数(人气高手)
            list: [],
            nomore: false,
            page: 0,
            empty: false
        },
        list_rate: {//盈利率
            list: [],
            nomore: false,
            page: 0,
            empty: false
        }
    },
    subscriptions: {},
    reducers: {
        assignTypeChoose(state,{value}){
          return {
              ...state,
              type_choose:value
          }
        },
        assignTabs(state, {choose_index}) {
            let tabs = state.tabs;
            let list_name = '';
            tabs.map((item, index) => {
                if (index === choose_index) {
                    if (tabs[choose_index]['choose'] === true) {
                        item['sort'] = item['sort'] === 'asc' ? 'desc' : 'asc';
                        if (choose_index === 0) {
                            list_name = 'list_earn';
                            item['srot'] = item['sort'] === 'asc' ? 4 : 3;
                        }
                        if (choose_index === 1) {
                            list_name = 'list_win';
                            item['srot'] = item['sort'] === 'asc' ? 6 : 5;
                        }
                        if (choose_index === 2) {
                            list_name = 'list_hot';
                            item['srot'] = item['sort'] === 'asc' ? 8 : 7;
                        }
                    }
                    item['choose'] = true;
                } else {
                    item['choose'] = false;
                }
            })
            state.tabs = [...tabs];
            // state[list_name] = {
            //     list: [],
            //     nomore: false,
            //     page: 0,
            //     empty: false
            // }
            return {
                ...state
            }
        },
        assignList(state, {data, page, name}) {
            let nomore = false;
            if (data.length === 0 || data.length < 10) {
                nomore = true;
            }
            if (page === 1) {
                state[name] = {
                    list: data,
                    page: 1,
                    nomore: nomore
                }
                return {
                    ...state,
                }
            } else {
                state[name] = {
                    list: [...state[name].list, ...data],
                    page: page,
                    nomore: nomore
                }
                return {
                    ...state,
                }
            }
        }
    },
    effects: {
        * getList({page = 1}, {call, put, select}) {
            const tabs = yield select(state => state.leaders.tabs);
            const type_choose = yield select(state => state.leaders.type_choose);
            // const test = tabs.indexOf(tabs.filter(item => item.choose)[0]);
            let srot,name;
            for (let tab of tabs) {
                if (tab['choose']) {
                    srot = tab['srot'];
                    name = tab['name'];
                }
            }
            const {data} = yield call(LeadersServices.getList, {type: type_choose, page: page, pageSize: 10, srot: srot})
            loading = false;
            if (data) {
                yield put({
                    type: 'assignList',
                    data: data.数据,
                    page: page,
                    name: name,
                })
            }
        },
        * loadMore({}, {put, select}) {
            if (!loading) {
                const tabs = yield select(state => state.leaders.tabs);
                let srot;
                for (let tab of tabs) {
                    if (tab['choose']) {
                        srot = tab['srot'];
                    }
                }
                let page, nomore;
                if (srot === 1 || srot === 2) {//盈亏比例
                    page = yield select(state => state.leaders.list_win.page);
                    nomore = yield select(state => state.leaders.list_win.nomore);
                }
                if (srot === 3 || srot === 4) {//总收益(收益高手)
                    page = yield select(state => state.leaders.list_earn.page);
                    nomore = yield select(state => state.leaders.list_earn.nomore);
                }
                if (srot === 5 || srot === 6) {//盈利率(常胜高手)
                    page = yield select(state => state.leaders.list_win.page);
                    nomore = yield select(state => state.leaders.list_win.nomore);
                }
                if (srot === 7 || srot === 8) {//跟随人数(人气高手)
                    page = yield select(state => state.leaders.list_hot.page);
                    nomore = yield select(state => state.leaders.list_hot.nomore);
                }
                if (!nomore) {
                    yield put({
                        type: 'getList',
                        page: page + 1,
                    })
                }
                loading = true;
            }
        }
    }
}
