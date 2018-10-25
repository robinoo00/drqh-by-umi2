export default {
    namespace: 'home',
    state: {
        list:[]
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {

            })
        },
    },

    effects: {
    },

    reducers: {
        assignList(state,{data}){
            return {
                ...state,
                list:data
            }
        }
    },

};
