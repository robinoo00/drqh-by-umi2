import CSSModules from 'react-css-modules'
import styles from '../styles/login.css'
import {connect} from 'dva'
// import Header from '../../../components/header/header'
import Button from '../../../components/button/button'
import {createForm} from 'rc-form'
import {Toast,Picker,Modal,Flex} from 'antd-mobile'
import router from 'umi/router'
import config from '../../../utils/config'
import qrcode from '../images/qrcode.png'
import logo from '../images/logo.png'

const Login = ({...rest}) => (
    <div styleName="mod-login">
        {/*<Header*/}
            {/*back={false}*/}
            {/*bgColor={'#20212b'}*/}
        {/*/>*/}
        <div styleName="logo">
            <img styleName="logo-img" src={logo} alt=""/>
        </div>
        <div styleName="forms">
            {/*<Picker*/}
                {/*cols={1}*/}
                {/*data={rest.pickerData}*/}
                {/*{...rest.form.getFieldProps('sev',{*/}
                    {/*initialValue:[rest.choose.value]*/}
                {/*})}>*/}
                {/*<Flex  styleName="mod-form">*/}
                    {/*<Flex.Item styleName="label-wrap">*/}
                        {/*<label>类型</label>*/}
                    {/*</Flex.Item>*/}
                    {/*<Flex.Item>*/}
                        {/*<input type="text" styleName="inp" value={rest.choose.label} readOnly/>*/}
                    {/*</Flex.Item>*/}
                {/*</Flex>*/}
            {/*</Picker>*/}
            <Flex  styleName="mod-form">
                <Flex.Item styleName="label-wrap">
                    <label>账号</label>
                </Flex.Item>
                <Flex.Item>
                    <input {...rest.form.getFieldProps('account', {
                        initialValue: localStorage.getItem(config.ACCOUNT) === null ? '' : localStorage.getItem(config.ACCOUNT),
                        rules: [{
                            required: true, message: '请输入您的账号',
                        }],
                    })} type="text" styleName="inp" placeholder="用户名、手机号"/>
                </Flex.Item>
            </Flex>
            <Flex styleName="mod-form">
                <Flex.Item styleName="label-wrap">
                    <label>密码</label>
                </Flex.Item>
                <Flex.Item>
                    <input {...rest.form.getFieldProps('password', {
                        initialValue: localStorage.getItem(config.PASSWORD) === null ? '' : localStorage.getItem(config.PASSWORD),
                        rules: [{
                            required: true, message: '请输入登录密码',
                        }],
                    })} type="password" styleName="inp" placeholder="请输入登录密码"/>
                </Flex.Item>
            </Flex>
            <div styleName="option">
                <input type="checkbox" styleName="checkbox" checked={rest.pwd_cash} onChange={rest._handlePwdNeed}/>
                <span styleName="remember_pw" onClick={rest._handlePwdNeed}>记住密码</span>
            </div>
        </div>
        <div styleName="action">
            <div>
                <Button
                    title={'登录'}
                    callBack={rest.submit(rest.sev)}
                />
            </div>
            <div style={{marginTop: '.15rem'}}>
                <Button
                    title={'免费注册'}
                    bgColor={'#E34C4D'}
                    callBack={() => {router.push('/register')}}
                />
            </div>
            <Flex>
                <Flex.Item styleName="links">
                    {/*<a href={"tel:"+config.SERVICE_TEL}>联系客服</a>*/}
                </Flex.Item>
                <Flex.Item styleName="links" style={{textAlign:'right'}}>
                    <a onClick={rest.showQrcode}>扫码下载</a>
                </Flex.Item>
            </Flex>
        </div>
    </div>
)

const mapStateToProps = state => ({
    account:state.login.account,
    password:state.login.password,
    choose:state.login.pickerData.filter(item => item.choose)[0],
    pickerData:state.login.pickerData,
    pwd_cash:state.login.pwd_cash,
})

const mapDispatchToProps = (dispatch, props) => ({
    _handlePwdNeed:() => {
        dispatch({
            type:'login/assignPwdCash'
        })
    },
    showQrcode:() => {
        Modal.alert('', <img style={{width:'100%'}} src={qrcode}/>,
            [
            { text: '关闭', onPress: () => {} },
        ])
    },
    submit: sev => () => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                dispatch({
                    type: 'login/LoginIn',
                    // values: {account: value.account, password: value.password, sev: value.sev[0]},
                    values: {account: value.account, password: value.password},
                });
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    }
})

export default createForm()(connect(mapStateToProps, mapDispatchToProps)(CSSModules(Login, styles)))
