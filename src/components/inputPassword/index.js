import {Modal, List, Flex} from 'antd-mobile'
import CSSModules from 'react-css-modules'
import styles from './inputPassword.less'
import React from 'react'
import {connect} from 'dva'
import {accAdd} from '@/utils/common'

const keys = [
    {type: 'price1', style: 'key', num: '对手价', en: ''},
    {type: 'key', style: 'num', num: 1, en: ''},
    {type: 'key', style: 'num', num: 2, en: ''},
    {type: 'key', style: 'num', num: 3, en: ''},
    {type: 'price2', style: 'key', num: '对手价', en: '超一'},
    {type: 'key', style: 'num', num: 4, en: ''},
    {type: 'key', style: 'num', num: 5, en: ''},
    {type: 'key', style: 'num', num: 6, en: ''},
    {type: 'price3', style: 'key', num: '最新价', en: ''},
    {type: 'key', style: 'num', num: 7, en: ''},
    {type: 'key', style: 'num', num: 8, en: ''},
    {type: 'key', style: 'num', num: 9, en: ''},
    {type: 'price4', style: 'key', num: '市价', en: ''},
    {type: 'key', style: 'bot', num: '.', en: ''},
    {type: 'key', style: 'num', num: 0, en: ''},
    {type: 'reback', style: 'reback', num: '', en: ''},
]

const addValue = [
    {code:'CL',value:0.01},
    {code:'FD',value:0.5},
    {code:'GC',value:0.1},
    {code:'HG',value:0.0005},
    {code:'HH',value:1},
    {code:'HS',value:1},
    {code:'MH',value:1},
    {code:'NG',value:0.001},
    {code:'NQ',value:0.25},
    {code:'SI',value:0.005},
    {code:'6B',value:0.0001},
    {code:'6E',value:0.00005},
    {code:'ES',value:0.25}
]

/*
* 参数 hide: void 隐藏
* visible: bool 是否显示
* finish: 完成回调
* */
class InputPassword extends React.Component {
    state = {
        visible: false,
        value: ''
    }

    constructor(props) {
        super(props)
        this.state.visible = props.visible
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.visible != nextProps.visible) {
            this.setState({
                visible: nextProps.visible,
            })
        }
    }

    inputValue = v => {
        let value = this.state.value
        if(v === '.' && value.includes('.')){

        }else{
            this.setState({
                value: `${value}${v}`
            })
        }

    }
    assignValue = v => {
        this.setState({
            value: v
        })
    }
    fhinish = (pass) => {
        const {finish, hide} = this.props
        finish(this.state.value)
        hide()
    }
    reback = () => {
        const str = this.state.value.toString()
        console.log(str)
        this.setState({
            value: str.slice(0, str.length - 1)
        })
    }
    _hide = () => {
        this.props.hide()
        this.setState({
            value:''
        })
    }
    _onClick = item => () => {
        if (item.type === 'key') {
            this.inputValue(item.num)
        }
        if (item.type === 'reback') {
            this.reback()
        }
        if(item.type === 'price1'){
            const {actionType,data} = this.props
            if(actionType === '买入'){
                this.assignValue(data.买价)
            }
            if(actionType === '卖出'){
                this.assignValue(data.卖价)
            }
        }
        if(item.type === 'price2'){
            const {actionType,data} = this.props
            const unit = data.合约.slice(0,2)
            const value = addValue.filter(item => item.code === unit)[0]['value']
            if(actionType === '买入'){
                this.assignValue(accAdd(data.买价,value))
            }
            if(actionType === '卖出'){
                this.assignValue(accAdd(data.卖价,value))
            }
        }
        if (item.type === 'price3') {
            const {data} = this.props
            this.assignValue(data.最新价)
        }
        if(item.type === 'price4'){
            const {submit} = this.props
            submit()
        }
    }

    render() {
        return (
            <Modal
                popup
                visible={this.state.visible}
                onClose={this._hide}
                animationType="slide-up"
            >
                <Flex styleName="view-screen">
                    <Flex.Item styleName="view">
                        {this.state.value}
                    </Flex.Item>
                    <Flex.Item styleName="close" onClick={this.fhinish}>
                        确认
                    </Flex.Item>
                </Flex>
                <Flex styleName='keyboard' wrap={'wrap'}>
                    {keys.map((item, index) => (
                        <Flex wrap={'wrap'}
                              onClick={this._onClick(item)}
                              styleName={item.style}
                              key={item.type + index}
                        >
                            <div styleName="value">{item.num}</div>
                            {item.en ? <div styleName="en">{item.en}</div> : null}
                        </Flex>
                    ))}
                </Flex>
            </Modal>
        )
    }
}

export default CSSModules(InputPassword, styles)
