import CSSModules from 'react-css-modules'
import styles from '../styles/position-list.less'
import {Flex, Modal, List, Button, InputItem} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'
import AlertItem from './ping-check-alert'
import LimitEarn from './limit-earn'
import router from 'umi/router'

@connect(({tradeList}) => ({
    list: tradeList.position_list.list
}))
@CSSModules(styles)

export default class extends React.PureComponent {
    // constructor(props){
    //     super(props)
    //     this.sid = 0
    //     this.state = {
    //         list:props.list
    //     }
    //     this.reBuildList()
    //     this.sid = setInterval(() => {this.reBuildList()},1000)
    // }
    // static getDerivedStateFromProps(props,state){
    //     if(props.list.length != 0){
    //         return {
    //             list:[...props.list]
    //         }
    //     }else{
    //         return state
    //     }
    // }
    // componentWillUnmount(){
    //     clearInterval(this.sid)
    // }
    // reBuildList = () => {
    //     const {dispatch} = this.props
    //     const {list} = this.state
    //     list.map((item,index) => {
    //         if(!item['slPrice']){
    //             item['slPrice'] = '--'
    //         }
    //         if(!item['tpPrice']){
    //             item['tpPrice'] = '--'
    //         }
    //         dispatch({
    //             type:'tradeList/getLimitByCode',
    //             code:item.合约
    //         }).then(data => {
    //             if(data.length != 0){
    //                 item['slPrice'] = data[0]['slPrice']
    //                 item['tpPrice'] = data[0]['tpPrice']
    //                 if(index === list.length - 1){
    //                     this.setState({
    //                         list:[...list]
    //                     })
    //                 }
    //             }
    //         })
    //     })
    // }
    limitLose = item => () => {
        const {dispatch} = this.props
        dispatch({
            type: 'tradeList/showLimitEarn',
            data: item
        })
    }
    pingcang = (item) => () => {
        const {dispatch} = this.props
        dispatch({
            type: 'tradeList/showPingModal',
            item: item
        })
    }
    link = item => () => {
        router.push({pathname:'/trade',query:{code:item.合约}})
    }
    render() {
        const {list} = this.props
        if(list.length === 0) return null
        return (
            <div styleName="wrap">
                <LimitEarn/>
                <AlertItem/>
                {list.map((item, index) => (
                    <div styleName="item" key={"tradeList_" + index}>
                        <div styleName="line1">
                            <div styleName="info" onClick={this.link(item)}>
                                <div styleName="info-item">
                                    <span styleName="name">{item.合约}</span>
                                    <span styleName="money">/{item.货币}</span>
                                    <span
                                        styleName={item.方向 === "买入" ? "down" : "up"}>{item.方向 === "买入" ? "买" : "卖"}</span>
                                    <span>×{item.数量}手</span>
                                </div>
                                <div styleName="info-item">
                                    <span styleName="time">{item.开仓时间}</span>
                                </div>
                            </div>
                            <div styleName="action">
                                {/*<span styleName={item.浮动盈亏 > 0 ? "up-num" : "down-num"}>{item.浮动盈亏}</span>*/}
                                <span onClick={this.pingcang(item)} styleName="ping-btn">平仓</span>
                                {/*<span onClick={rest.limitLose(item)} styleName="ping-btn">损盈</span>*/}
                            </div>
                        </div>
                        <Flex styleName="price">
                            <Flex.Item styleName="price-item">
                                <p>{item.均价}</p>
                                <p>均价</p>
                            </Flex.Item>
                            <Flex.Item styleName="price-item">
                                <p>{item.当前价}</p>
                                <p>当前价</p>
                            </Flex.Item>
                            <Flex.Item styleName="price-item">
                                <p>{item.止赢损列表.length != 0 ? item.止赢损列表[0]['slPrice'] : '--'}</p>
                                <p>止损价</p>
                                <p>{item.止赢损列表.length != 0 ? item.止赢损列表[0]['tpPrice'] : '--'}</p>
                                <p>止盈价</p>
                            </Flex.Item>
                            <Flex.Item styleName="price-item">
                                <p styleName={item.浮动盈亏 > 0 ? "up-num" : "down-num"}>{item.浮动盈亏}</p>
                                <p>浮动盈亏</p>
                                <p>&nbsp;</p>
                                <p><span onClick={this.limitLose(item)} styleName="ping-btn">止损止盈</span></p>
                            </Flex.Item>
                        </Flex>
                    </div>
                ))}
            </div>
        )
    }
}
