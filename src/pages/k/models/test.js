export default {
    namespace:'k',
    state:{
        type_list:['分时','1分钟','5分钟','15分钟','1小时','1日'],
        type_choose:'分时',
        data_0:[],
        data_1:[],
        data_2:[],
        data_3:[],
        data_4:[],
        data_5:[],
        draw_data:[]
    },
    reducers:{
        init(state,{}){
            state = {
                type_list:['分时','1分钟','5分钟','15分钟','1小时','1日'],
                type_choose:'分时',
                data_0:[],
                data_1:[],
                data_2:[],
                data_3:[],
                data_4:[],
                data_5:[],
                draw_data:[]
            };
            return {
                ...state
            }
        },
        assignTypeChoose(state,{value}){
          return {
              ...state,
              type_choose:value,
              draw_data:[]
          }
        },
        assignData(state,{data}){
            const list = state.type_list;
            const type = state.type_choose;
            const index = list.indexOf(type);
            let new_data;
            // console.log('assignData',data);
            if(state['data_'+index].length === 0){
                new_data = data;
            }else{
                new_data = data.length > 1 ? [...state['data_'+index],...data] : state['data_'+index];
            }
            return {
                ...state,
                ['data_'+index]:new_data,
                draw_data:data
            }
        }
    }
}
