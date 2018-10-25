export default {
    namespace:'charge',
    state:{
        nav:[{
            text:'OTC交易',
            choose:true
        },{
            text:'钱包转账',
            choose:false
        }],
        protocol:true
    },
    subscriptions:{},
    reducers:{
        assignProtocol(state,{}){
            return {
                ...state,
                protocol:!state.protocol
            }
        }
    },
    effects:{}
}
