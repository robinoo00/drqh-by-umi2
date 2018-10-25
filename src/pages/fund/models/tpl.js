import * as FundServices from '../services/tpl'
let loading = false;

export default {
    namespace: 'fund',
    state: {
        nav_show:false,
        nav_choose:'充值',
        nav_list:[
            {title:'充值',choose:true},
            {title:'提现',choose:false},
            {title:'收入',choose:false},
            {title:'支出',choose:false},
        ],
        list:[],
        page:0,
        nomore:false
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
        *getList({page =1},{call,put,select}){
            const {data} = yield call(FundServices.getList,{page:page})
            loading = false;
            if(data){
                yield put({
                    type:'assignList',
                    data:data.data,
                    page:page
                })
            }
        },
        *loadMore({},{put,select}){
            if(!loading){
                const page = yield select(state => state.fund.page);
                const nomore = yield select(state => state.fund.nomore);
                if(!nomore){
                    yield put({
                        type:'getList',
                        page:page + 1
                    })
                }
                loading = true;
            }
        }
    },

    reducers: {
        assignList(state,{data,page}){
            let nomore = false;
            if(data.length === 0 || data.length < 30){
                nomore = true;
            }
            if(page === 1){
                return {
                    ...state,
                    list:data,
                    page:1,
                    nomore:nomore
                }
            }else{
                return {
                    ...state,
                    list:[...state.list,...data],
                    page:page,
                    nomore:nomore
                }
            }
        },
        toggleShow(state){
            return{
                ...state,
                nav_show:!state.nav_show
            }
        },
        assignChoose(state,{index}){
            let temp = [
                {title:'充值',choose:false},
                {title:'提现',choose:false},
                {title:'收入',choose:false},
                {title:'支出',choose:false},
            ];
            temp[index]['choose'] = true;
            return {
                ...state,
                nav_choose:temp[index]['title'],
                nav_list:[...temp]
            }
        }
    },

};
