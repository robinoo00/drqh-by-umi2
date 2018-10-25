import CSSModules from 'react-css-modules'
import styles from '../styles/form.css'
import {connect} from 'dva'
import ItemBasic from './item-basic'
import ItemArea from './item-area'
import ItemPic from './item-pic'
import ItemCode from './item-code'
import {createForm} from 'rc-form'
import {Toast,Button,Flex} from 'antd-mobile'
import React from 'react'
import router from 'umi/router'

const Form = ({...rest}) => (
    <div styleName="mod-form-wrap">
        {rest.list.map(item => (
            <div key={'register_'+item.name}>
                {item.type == 'basic' ? <ItemBasic getFieldProps={rest.form.getFieldProps} data={item}/> : ''}
                {item.type == 'area' ? <ItemArea data={item}/> : ''}
                {item.type == 'pic' ? <ItemPic getFieldProps={rest.form.getFieldProps}/> : ''}
                {item.type == 'code' ?<ItemCode data={item} getFieldValue={rest.form.getFieldValue} getFieldProps={rest.form.getFieldProps}/> : ''}
            </div>
        ))}
        <p styleName="txt-grey">
            <input type="checkbox" defaultChecked={rest.agree} onClick={rest.assignAgree}/>
            <label>
                我已阅读并同意<a href="javascript:;" onClick={rest.assignAgreeShow} style={{color:'#5B78C0'}}>《用户注册协议书1-5》</a>
            </label>
        </p>
        <div style={{margin:'.1rem 0'}}>
            <Button type={'primary'}
                    style={{backgroundColor:'#5B78C0', lineHeight: '.3rem', height: '.3rem',fontSize:'0.13rem'}}
                    onClick={rest.submit}
            >提交</Button>
        </div>
    </div>
)

const mapStateToProps = state => ({
    list:state.register.list,
    agree:state.register.agree
})

const mapDispatchToProps = (dispatch,props) => ({
    assignAgree:() => {
      dispatch({
          type:'register/assignAgree'
      })
    },
    assignAgreeShow:() => {
        router.push('agreement');
      //   dispatch({
      //     type:'register/assignAgreeShow'
      // })
    },
    submit:() => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                dispatch({
                    type:'register/validateByServer',
                    value:value
                })
                dispatch({
                    type:'register/validate'
                })
                dispatch({
                    type:'register/submit',
                    values:value
                })
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    }
})

export default createForm({onFieldsChange:(props,fileds,all) => {
}})(connect(mapStateToProps,mapDispatchToProps)(CSSModules(Form,styles)))
