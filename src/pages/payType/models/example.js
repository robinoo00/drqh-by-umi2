export default {
  namespace: 'payType',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
        return history.listen(({pathname,query}) => {
            if(pathname === '/payType'){
            }
        })
    },
  },

  effects: {

  },

  reducers: {

  },

};
