import CSSModules from 'react-css-modules'
import styles from '../styles/position-list.less'
import {Flex, Modal, List, Button,InputItem} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'
import AlertItem from './ping-check-alert'
import LimitEarn from './limit-earn'
import router from 'umi/router'

const PositionList = ({...rest}) => (
    <div styleName="wrap">
        <LimitEarn/>
        <AlertItem/>
        {rest.list.map((item, index) => (
            <div styleName="item" key={"tradeList_" + index}>
                <div styleName="line1">
                    <div styleName="info">
                        <div styleName="info-item">
                            <span styleName="name">{item.合约}</span>
                            <span styleName="money">/{item.货币}</span>
                            <span styleName={item.方向 === "买入" ? "down" : "up"}>{item.方向 === "买入" ? "买" : "卖"}</span>
                            <span>×{item.数量}手</span>
                        </div>
                        <div styleName="info-item">
                            <span styleName="time">{item.开仓时间}</span>
                        </div>
                    </div>
                    <div styleName="action">
                        {/*<span styleName={item.浮动盈亏 > 0 ? "up-num" : "down-num"}>{item.浮动盈亏}</span>*/}
                        <span onClick={rest.pingcang(item,rest.ping_num)} styleName="ping-btn">平仓</span>
                        <span onClick={rest.limitLose(item)} styleName="ping-btn">损盈</span>
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
                        <p>{item.市场价}</p>
                        <p>市场价</p>
                    </Flex.Item>
                    <Flex.Item styleName="price-item">
                        <p styleName={item.浮动盈亏 > 0 ? "up-num" : "down-num"}>{item.浮动盈亏}</p>
                        <p>浮动盈亏</p>
                    </Flex.Item>
                </Flex>
            </div>
        ))}
    </div>
)

const mapStateToProps = state => ({
    list: state.tradeList.position_list.list,
})

const mapDispatchToProps = dispatch => ({
    limitLose: item => () => {
        dispatch({
            type:'limits/assignTempData',
            data:item
        })
        router.push({pathname:'limits',query:{code:item['合约']}})
    },
    pingcang: (item) => () => {
        dispatch({
            type:'tradeList/showPingModal',
            item:item
        })
        // Modal.alert('确认平仓?', <AlertItem
        //     item={item}
        //     num={ping_num}
        //     del={()  => {
        //         console.log('de')
        //         dispatch({
        //             type:'tradeList/assignPingNum',
        //             action:'del'
        //         })
        //     }}
        //     add={()  => {
        //         dispatch({
        //             type:'tradeList/assignPingNum',
        //             action:'add'
        //         })
        //     }}
        // />, [
        //     {
        //         text: '取消', onPress: () => {
        //         }
        //     },
        //     {
        //         text: '确定', onPress: () => {
        //             window.loading('交易中');
        //             dispatch({
        //                 type: 'tradeList/ping',
        //                 direction: item.方向 === "买入" ? 0 : 1,
        //                 code: item.合约
        //             })
        //         }
        //     }
        // ])
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(PositionList, styles))
