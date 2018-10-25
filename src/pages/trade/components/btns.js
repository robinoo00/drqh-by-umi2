import CSSModules from 'react-css-modules'
import styles from '../styles/btns.less'
import {connect} from 'dva'
import {Modal} from 'antd-mobile'
import config from '../../../utils/config'
import React from 'react'
import {Toast, Flex} from 'antd-mobile'
// import Tip from '../images/tip.wav'
import {ifSwitch} from '@/utils/common'

const prompt = Modal.prompt;

let id;

class Btns extends React.Component {
    componentWillReceiveProps() {
        const {no_trade} = this.props;
        if (no_trade) {
            clearInterval(id);
        }
    }

    componentDidMount() {
        const {getPingNum} = this.props;
        id = setInterval(getPingNum, 1000)
    }

    componentWillUnmount() {
        clearInterval(id);
    }

    render() {
        const {...rest} = this.props;
        return (
            <Flex styleName="wrap">
                {/*<video id={"trade-video"} src={Tip} style={{display:'none'}}></video>*/}
                <Flex.Item styleName="buy"
                           onClick={rest.price_type === 1 ? () => {ifSwitch('确定买入？', rest.buy()) }: rest.limitOrder('买入' + rest.num + '手',rest.data.最新价, rest.buy())}>
                    买 {rest.data.买价}
                </Flex.Item>
                <Flex.Item styleName="ping"
                            onClick={rest.ifSwitch('确定平仓？', rest.ping)}>
                    平仓 {rest.ping_num}手
                </Flex.Item>
                <Flex.Item styleName="sell"
                           onClick={rest.price_type === 1 ? () => {ifSwitch('确定卖出？', rest.sell()) } : rest.limitOrder('卖出' + rest.num + '手',rest.data.最新价, rest.sell())}>
                    卖 {rest.data.卖价}
                </Flex.Item>
            </Flex>
        )
    }
}

const mapStateToProps = state => ({
    ping_num: state.trade.ping_num,
    no_trade: state.trade.no_trade,
    num: state.trade.num,
    price_type: state.trade.price_type
})

const mapDispatchToProps = (dispatch, props) => ({
    getPingNum: () => {
        dispatch({
            type: 'trade/getPingNum'
        })
    },
    limitOrder: (title,newestPrice, callback) => () => {
        const buy = title.includes('买') ? true : false;
        prompt(
            title,
            buy ? '买入需低于最新价' : '卖出需高于最新价',
            [
                {text: '取消'},
                {
                    text: '提交', onPress: value => {
                        if (isNaN(value)) {
                            window.toast('价格有误')
                            return;
                        }
                        if (value === "") {
                            window.toast('价格不能为空')
                            return;
                        }
                        if(buy && value > newestPrice){
                            window.toast('买入需低于最新价')
                            return;
                        }
                        if(!buy && value < newestPrice){
                            window.toast('卖出需高于最新价')
                            return;
                        }
                        dispatch({
                            type: 'trade/assignLimitPirce',
                            price: value
                        })
                        callback && callback()
                    }
                },
            ],
        )
    },
    ifSwitch: (title, callback) => () => {
        if (localStorage.getItem(config.TRADE_SWITCH) === null || localStorage.getItem(config.TRADE_SWITCH) === "true") {
            Modal.alert(title, '', [
                {
                    text: '取消', onPress: () => {
                    }
                },
                {
                    text: '确定', onPress: () => {
                        callback && callback();
                    }
                }
            ])
        } else {
            callback && callback();
        }
    },
    buy: (price=0) => () => {
        window.loading('交易中...', 0);
        dispatch({
            type: 'trade/order',
            direction: "买入",
            price:price
        })
    },
    sell: (price = 0) => () => {
        window.loading('交易中...', 0);
        dispatch({
            type: 'trade/order',
            direction: "卖出",
            price:price
        })
    },
    ping: () => {
        window.loading('交易中...', 0);
        dispatch({
            type: 'trade/ping',
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Btns, styles))

