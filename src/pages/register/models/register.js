import * as RegisterServices from '../services/register'
import {Toast,Modal} from 'antd-mobile'
import tp1 from '../images/tp1.png'
import tp2 from '../images/tp2.png'
import tp3 from '../images/tp3.png'
import tp4 from '../images/tp4.png'
import router from 'umi/router'

export default {
    namespace: 'register',
    state: {
        list: [
            {title: '推荐号', type: 'basic', name: 'c1'},
            {title: '手机号', type: 'basic', name: 'c2'},
            {title: '真实姓名', type: 'basic', name: 'c3'},
            {title: '身份证号', type: 'basic', name: 'c4'},
            // {title: '所属地区', type: 'area', name: 'c5'},
            {title: '详细地址', type: 'basic', name: 'c6'},
            {title: '开户银行', type: 'basic', name: 'c7'},
            {title: '开户行', type: 'basic', name: 'c8'},
            {title: '银行卡号', type: 'basic', name: 'c9'},
            {title: '卡人姓名', type: 'basic', name: 'c10'},
            {title: '', type: 'pic', name: 'c11'},
            {title: '', type: 'code', name: 'c12'},
        ],
        code:'',
        province: [],
        city: [],
        district: [],
        province_choose: '',
        city_choose: '',
        district_choose: '',
        tp_list: [
            {title: '身份证正面', src: tp1, name: 'pic1', value: '',up:false},
            {title: '身份证背面', src: tp4, name: 'pic2', value: '',up:false},
            {title: '手持身份证', src: tp2, name: 'pic3', value: '',up:false},
            {title: '银行卡正面', src: tp3, name: 'pic4', value: '',up:false},
        ],
        agree_show:false,
        agree:false,
        validate:false
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
            })
        },
    },

    effects: {
        * sendCode({phone}, {put, call}) {
            const {data} = yield call(RegisterServices.sendCode, {phone: phone});
            if(data){
                Toast.info(data.信息,1);
            }
        },
        *validate({},{put,call,select}){
            yield put({
                type:'assignValidate',
                bool:false
            })
          //校验图片
            const tp_list = yield select(state => state.register.tp_list);
            for (let key in tp_list) {
                let item = tp_list[key];
                if(!item.up){
                    Toast.info('请上传' + item.title,1);
                    return;
                }
            }
            //校验验证码
            const code = yield select(state => state.register.code);
            if(!code){
                Toast.info('请输入验证码',1);
                return;
            }
            //校验协议
            const agree = yield select(state => state.register.agree);
            if(!agree){
                Toast.info('请先同意协议',1);
                return;
            }
            yield put({
                type:'assignValidate',
                bool:true
            })
        },
        /*通过服务端校验*/
        * validateByServer({value},{call,put,select}){
            yield put({
                type:'assignValidate',
                bool:false
            })
            let res;
            //校验推荐码
            res = (yield call(RegisterServices.valGid,{param:value.c1}))['data'];
            if(res && !res.状态){
                Toast.info(res.信息);
                return;
            }
            //校验手机号
            res = (yield call(RegisterServices.valPhone,{param:value.c2}))['data'];
            if(res && !res.状态){
                Toast.info(res.信息);
                return;
            }
            //身份证校验
            res = (yield call(RegisterServices.valIDCode,{param:value.c4}))['data'];
            if(res && !res.状态){
                Toast.info(res.信息);
                return;
            }
            //校验验证码
            const code = yield select(state => state.register.code);
            res = (yield call(RegisterServices.valPhone,{param:code,phone:value.c2}))['data'];
            if(res && !res.状态){
                Toast.info(res.信息);
                return;
            }

            yield put({
                type:'assignValidate',
                bool:true
            })
        },
        * submit({values}, {put, call, select}) {
            const validate = yield select(state => state.register.validate);
            if(!validate){
                return;
            }
            Toast.loading('',0)
            let formData = new FormData();
            //赋值基本参数
            const keys = Object.keys(values);
            keys.map(key => {
                formData.append(key,values[key])
            })
            //赋值验证码
            const code = yield select(state => state.register.code);
            formData.append('c11',code)
            //赋值图片
            const tp_list = yield select(state => state.register.tp_list);
            for (let key in tp_list) {
                let item = tp_list[key];
                console.log(item.value)
                formData.append(item.name,item.value);
            }
            const {data} = yield call(RegisterServices.submit, formData);
            Toast.hide();
            if(data){
                Toast.info(data.信息);
                if(data.状态){
                    Modal.alert('注册成功', <p style={{padding:'0 15px'}}>请耐心等待，账号密码将以短信形式发送，请注意查收</p>,
                        [
                            { text: '确定', onPress: () => {router.push('/login')} },
                        ]);
                }
            }else{
                Toast.info('注册异常')
            }
        },
        * getProvince({}, {call, put}) {
            const {data} = yield call(RegisterServices.getArea);
            let temp = ['请选择'];
            data.map(item => {
                temp.push(item.n);
            })
            yield put({
                type: 'assignProvince',
                data: temp
            })
        },
        * getCity({name = ''}, {call, put}) {
            const {data} = yield call(RegisterServices.getArea);
            let temp = [];
            data.map(item => {
                if (item.n === name) {
                    temp = item.s
                }
            })
            let temp2 = ['请选择'];
            temp.map(item => {
                temp2.push(item.n);
            })
            yield put({
                type: 'assignCity',
                data: temp2
            })
            yield put({
                type: 'assignProvinceChoose',
                name: name
            })
        },
        * getDistrict({name}, {call, put, select}) {
            const {data} = yield call(RegisterServices.getArea);
            const province_choose = yield select(state => state.register.province_choose);
            const city = data.filter(item => item.n === province_choose)[0]['s'];
            const district = city.filter(item => item.n === name)[0]['s']
            let temp = ['请选择'];
            if (typeof district !== 'undefined') {
                if(district.length != 0){
                    district.map(item => {
                        temp.push(item.n)
                    })
                }
                yield put({
                    type: 'assignDistrict',
                    data: temp
                })
            }
            yield put({
                type: 'assignCityChoose',
                name: name
            })
        }
    },

    reducers: {
        assignValidate(state,{bool}){
            return {
                ...state,
                validate:bool
            }
        },
        assignAgree(state){
            return {
                ...state,
                agree:!state.agree
            }
        },
        assignAgreeShow(state){
          return{
              ...state,
              agree_show:!state.agree_show
          }
        },
        assignCode(state,{code}){
            return{
                ...state,
                code:code
            }
        },
        assignTp1(state, {file, index,src}) {
            let tp_list = state.tp_list;
            tp_list[index]['value'] = file;
            tp_list[index]['src'] = src;
            tp_list[index]['up'] = true;
            return {
                ...state,
                tp_list: [...tp_list],
            }
        },
        assignProvince(state, {data}) {
            return {
                ...state,
                province: data
            }
        },
        assignCity(state, {data}) {
            return {
                ...state,
                city: data
            }
        },
        assignDistrict(state, {data}) {
            return {
                ...state,
                district: data
            }
        },
        assignProvinceChoose(state, {name}) {
            return {
                ...state,
                province_choose: name
            }
        },
        assignCityChoose(state, {name}) {
            return {
                ...state,
                city_choose: name
            }
        },
        assignDistrictChoose(state, {name}) {
            return {
                ...state,
                district_choose: name
            }
        }
    },

};
