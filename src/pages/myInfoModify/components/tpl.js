import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {InputItem,WhiteSpace,Toast} from 'antd-mobile'
import {createForm} from 'rc-form'
import Button from '../../../components/button/button'

const Example = ({...rest}) => {
    return (
        <div>
            <Header
                title={rest.title}
            />
            <WhiteSpace size={'lg'}/>
            <InputItem
                {...rest.form.getFieldProps('old_password',{
                    initialValue:'',
                    rules:[
                        {
                            required:true,message:'请输入原登录密码'
                        }
                    ]
                })}
                type={"password"}
                placeholder={'请输入原登录密码'}
            >
                原登录密码
            </InputItem>
            <WhiteSpace size={'lg'}/>
            <InputItem
                {...rest.form.getFieldProps('new_password',{
                    initialValue:'',
                    rules:[
                        {
                            required:true,message:'请输入新登录密码'
                        }
                    ]
                })}
                type={"password"}
                placeholder={'请输入新登录密码'}
            >
                登录密码
            </InputItem>
            <InputItem
                {...rest.form.getFieldProps('re_password',{
                    initialValue:'',
                    rules:[
                        {
                            required:true,message:'请输入确认密码'
                        }, {
                            validator: rest.validateToNextPassword,
                        }
                    ]
                })}
                type={"password"}
                placeholder={'请输入确认密码'}
            >
                确认密码
            </InputItem>
            <div style={{padding:'.3rem .15rem'}}>
                <Button callBack={rest.submit} title={'确定'}/>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    title:state.myInfoModify.title
})

const mapDispatchToProps = (dispatch,props) => ({
    submit:() => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                console.log(value);
                dispatch({
                    type:'myInfoModify/passModify',
                    values:{
                        opass:value.old_password,
                        npass:value.new_password
                    }
                })
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    },
    validateToNextPassword(rule, value, callback){
        const form = props.form;
        if (value && value !== form.getFieldValue('new_password')) {
            callback('两次密码不相同!');
        } else {
            callback();
        }
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles)))

