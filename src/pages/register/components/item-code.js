import CSSModules from 'react-css-modules'
import styles from '../styles/form.css'
import {connect} from 'dva'
import {Toast,Flex} from 'antd-mobile'
import React from 'react'

class Item extends React.Component{
    state = {
        seconds:60,
        send_text:'获取验证码',
        can_send:true
    }
    countDown(){
        this.setState({
            can_send:false
        })
        let siv = setInterval(() => {
            this.setState((preState) => ({
                seconds: preState.seconds - 1,
                send_text:'('+(preState.seconds - 1)+')秒后发送'
            }), () => {
                if (this.state.seconds <= 0) {
                    clearInterval(siv);
                    this.setState({
                        send_text:'获取验证码',
                        seconds:60,
                        can_send:true
                    })
                }
            });
        }, 1000)
    }
    render(){
        const {...rest} = this.props;
        return(
            <Flex styleName="mod-form">
                <Flex.Item styleName="td1">验证码</Flex.Item>
                <Flex.Item>
                    <input onChange={rest.assignCode} type="text" styleName="inp" placeholder="请输入手机验证码"/>
                </Flex.Item>
                <Flex.Item>
                    <input styleName="CodeBtn" onClick={rest.sendCode(this.state.can_send,this.countDown.bind(this))} type="button" value={this.state.send_text}  disabled=""/>
                </Flex.Item>
            </Flex>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = (dispatch,props) => ({
    assignCode:(e) => {
      dispatch({
          type:'register/assignCode',
          code:e.target.value
      })
    },
    sendCode:(can_send,callbak) => () => {
        if(can_send){
            callbak && callbak()
            const phone = props.getFieldValue('c2')
            if(phone){
                dispatch({
                    type:'register/sendCode',
                    phone:phone
                })
            }else{
                Toast.info('请输入手机号');
            }
        }
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Item,styles))
