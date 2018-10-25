import {PureComponent} from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/header.less'
import Header from '../../../components/header/header'
import {Picker, Switch, Modal,List} from 'antd-mobile'
import router from 'umi/router'
import {connect} from 'dva'
import {chooseKType} from "../../../utils/common"
import config from "../../../utils/config";

const Item = List.Item

@connect(({trade}) => ({
    code_name: trade.code_name,
    code: trade.code,
    list: trade.list
}))
@CSSModules(styles)

export default class extends PureComponent {
    state = {
        setShow:false,
        setted:localStorage.getItem(config.TRADE_SWITCH)
    }
    assignTrade = (checked) => {
        console.log(checked)
        localStorage.setItem(config.TRADE_SWITCH,checked)
        this.setState({
            setted:checked
        })
    }
    _show = () => {
        this.setState({
            setShow:true
        })
    }
    _hide = () => {
        this.setState({
            setShow:false
        })
    }
    _renderSwitchModal = () => {
        const setted = this.state.setted
        return (
            <div>
                <Modal
                    visible={this.state.setShow}
                    transparent
                    maskClosable={true}
                    onClose={this._hide}
                    title="设置"
                    footer={[{ text: '关闭', onPress: this._hide }]}
                    className={"trade-switch"}
                >
                    <List style={{marginTop: '.1rem'}}>
                        <Item
                            extra={<Switch
                                onClick={this.assignTrade}
                                checked={setted}
                            />}
                        >交易需确认</Item>
                    </List>
                </Modal>
            </div>
        )
    }
    render() {
        const {code_name, list, code} = this.props
        return (
            <div>
                {this._renderSwitchModal()}
                <Header
                    // title={code_name}
                    title={<Picker
                        onChange={(val) => {
                            chooseKType(val[0]);
                            router.push({pathname: '/trade', query: {code: val[0]}})
                        }}
                        data={list} cols={1}>
                        <div>{code_name}</div>
                    </Picker>}
                    rightText={<div>
                    <span
                        onClick={this._show}
                    >设置</span>
                        &nbsp;&nbsp;
                        <span
                            onClick={() => {
                                router.push({pathname: '/tradeRule'})
                            }}
                        >规则</span>
                    </div>}
                    // rightCallBack={() => {router.push({pathname:'/tradeRule'})}}
                    leftCallBack={() => {
                        router.push({pathname: '/home'})
                    }}
                />
            </div>
        )
    }
}

