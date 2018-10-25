import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {InputItem,WhiteSpace,Toast} from 'antd-mobile'
import {createForm} from 'rc-form'
import Button from '../../../components/button/button'

const Example = ({form,list,submit,validateMoney}) => {
    return (
        <div>
            <Header
                title={'提现'}
            />
            <WhiteSpace size={"md"}/>
            <InputItem
                type={"money"}
                moneyKeyboardAlign={"left"}
                {...form.getFieldProps('money', {
                    initialValue: '',
                    rules: [{
                        required: true, message: '请输入交易金额',
                    }, {
                        validator: validateMoney,
                    }],
                })}
            >金额</InputItem>
            <InputItem
                type={"password"}
                moneyKeyboardAlign={"left"}
                {...form.getFieldProps('pass', {
                    initialValue: '',
                    rules: [{
                        required: true, message: '请输入交易密码',
                    }, {
                        validator: validateMoney,
                    }],
                })}
            >交易密码</InputItem>
            <div style={{padding:'.3rem .15rem'}} onClick={submit}>
                <Button
                    title={'确认'}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    list:state.withdraw.list
})

const mapDispatchToProps = (dispatch,props) => ({
    submit:() => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                const money = value.money;
                const pass = value.pass;
                dispatch({
                    type:'withdraw/withdraw',
                    money:money,
                    pass:pass
                })
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    },
    validateMoney(rule, value, callback){
        // if(value < 2 || value > 5000){
        //     callback('金额只能在2到5000之间!');
        // }else{
        //     callback();
        // }
        callback();
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles)))

