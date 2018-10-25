import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import {InputItem,WhiteSpace} from 'antd-mobile'
import {createForm} from 'rc-form'
import Button from '../../../components/button/button'
import config from '../../../utils/config'
import {Toast} from 'antd-mobile'

const Example = ({form,account,submit}) => {
    return (
        <div>
            <InputItem
                {...form.getFieldProps('account',{
                    initialValue:account
                })}
                editable={false}
            >
                账号
            </InputItem>
            <InputItem
                {...form.getFieldProps('money',{
                    initialValue:'',
                    rules:[{
                        required:true,message:'请输入金额'
                    }]
                })}
                type={'money'}
                moneyKeyboardAlign={'left'}
                placeholder={'请输入金额'}
            >
                充值金额
            </InputItem>
            <div style={{padding:'.3rem .15rem'}}>
                <Button
                    title={'提交'}
                    callBack={submit}
                />
            </div>
            {/*<div styleName="mod-prompt">*/}
                {/*<p styleName="txt-center">注意</p>*/}
                {/*<p>目前云闪付支持单卡单笔5000单日2万</p>*/}
                {/*<p>金额请与云闪付支付时金额一致</p>*/}
            {/*</div>*/}
        </div>
    );
};

const mapStateToProps = state => ({
    headerText:state.pay.headerText,
    account:localStorage.getItem(config.ACCOUNT),
})

const mapDispatchToProps = (dispatch,props) => ({
    submit:() => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                const params = {
                    usdt:value.money,
                    // alipay:value.aliAccount,
                    // tongdao:0,
                    account:value.account
                }
                dispatch({
                    type:'pay/submit',
                    params:params
                })
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example,styles)))

