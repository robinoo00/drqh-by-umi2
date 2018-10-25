import Header from '../../../components/header/header'
import {InputItem,Toast,Modal} from 'antd-mobile'
import {createForm} from 'rc-form'
import CSSModules from 'react-css-modules'
import styles from '../styles/index.less'
import {connect} from 'dva'
import Button from '../../../components/button/button'

const BankEdit = ({...rest}) => (
    <div>
        <Header
            title={'修改银行卡'}
        />
        <InputItem
            editable={false}
            defaultValue={rest.info.持卡人}
        >开户姓名</InputItem>
        <InputItem
            placeholder={'请输入开户银行'}
            {...rest.form.getFieldProps('bank', {
                initialValue: '',
                rules: [{
                    required: true, message: '请输入开户银行',
                }],
            })}
        >开户银行</InputItem>
        <InputItem
            placeholder={'请输入银行卡号'}
            {...rest.form.getFieldProps('bankno', {
                initialValue: '',
                rules: [{
                    required: true, message: '请输入银行卡号',
                }, {
                    validator: rest.validateBankNum,
                }],
            })}
        >银行卡号</InputItem>
        <InputItem
            placeholder={'请输入登录密码'}
            type={'password'}
            {...rest.form.getFieldProps('pass', {
                initialValue: '',
                rules: [{
                    required: true, message: '请输入登录密码',
                }, {
                    validator: rest.validateBankNum,
                }],
            })}
        >登录密码</InputItem>
        <p styleName="tip">
            注意：替换的银行卡必须为本人名下，并准确核对银行卡号，以避免申请出金后不能及时转入您卡内
        </p>
        <div style={{padding:'.3rem .15rem'}} onClick={rest.submit}>
            <Button
                title={'确认'}
            />
        </div>
    </div>
)

const mapStateToProps = state => ({
    info:state.personal.info
})

const mapDispatchToProps = (dispatch,props) => ({
    submit:() => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                Modal.alert('信息确认',<div>
                    <p>开户银行:{value.bank}</p>
                    <p>银行卡号:{value.bankno}</p>
                </div>,[{
                    text:'取消',onPress:() => {},
                },{text:'确定',onPress:() => {
                        dispatch({
                            type:'bankEdit/submit',
                            bank:value.bank,
                            bankno:value.bankno,
                            pass:value.pass
                        })
                    }}])
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    },
    validateBankNum(rule, value, callback){
        callback();
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(CSSModules(BankEdit, styles)))

