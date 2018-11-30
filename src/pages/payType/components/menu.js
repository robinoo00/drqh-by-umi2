import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {List,WhiteSpace,Modal} from 'antd-mobile'
import icon1 from '../images/alipay.png'
import icon2 from '../images/wx.png'
import React from 'react'
import config from "../../../utils/config";
const Item = List.Item;
const Brief = Item.Brief

class Example extends React.Component{
    componentDidMount(){
        // Modal.alert('',<img style={{width:'100%'}} src={'http://106.14.7.216:1018/pic/gonggao.png?time='+new Date().valueOf()}/>,[
        //     {text:'我已知晓',onPress:() => {}}
        // ])
    }
    render(){
        const {aliPay,wxPay} = this.props
        return(
            <div>
                <Header
                    title={'账户充值'}
                />
                <List renderHeader={() => '选择支付方式'} className="my-list">
                    <Item
                        onClick={aliPay}
                        multipleLine
                        arrow={"horizontal"}
                        thumb={<img src={icon1} style={{width:'.71rem',height:'.27rem'}}/>}
                    >
                        <div style={{fontSize:'.16rem',color:'#fff'}}>支付宝</div>
                        <Brief style={{fontSize:'.1rem'}}>手机支付，免手续费</Brief>
                    </Item>
                    <WhiteSpace size={"xs"} style={{backgroundColor:'#20212b'}}/>
                    {/*<Item*/}
                        {/*onClick={wxPay}*/}
                        {/*multipleLine*/}
                        {/*arrow={"horizontal"}*/}
                        {/*thumb={<img src={icon2} style={{width:'.71rem',height:'.27rem'}}/>}*/}
                    {/*>*/}
                        {/*<div style={{fontSize:'.16rem',color:'#fff'}}>微信支付</div>*/}
                        {/*<Brief style={{fontSize:'.1rem'}}>手机支付，免手续费</Brief>*/}
                    {/*</Item>*/}
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = (dispatch,props) => ({
    aliPay: () => {
        Modal.alert('',
            <div>
                <img style={{width: '100%'}} src={'http://47.101.154.35:1018/pic/alicode.jpg?time=' + new Date().valueOf()}/>
            </div>
            , [
                {text: '取消', onPress: null},
                {
                    text: '跳转支付', onPress: () => {
                        window.location.href = config.AliPayUrl
                    }
                }
            ])
    },
    wxPay: () => {
        Modal.alert('',
            <div>
                <img style={{width: '100%'}} src={'http://106.14.7.216:1018/pic/wxcode.png?time=' + new Date().valueOf()}/>
            </div>
            , [
                {text: '取消', onPress: null}
            ])
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

