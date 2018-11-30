import {PureComponent,Component} from 'react'
import styles from './index.less'
import {Flex,Toast} from 'antd-mobile'
import config from "../../../../utils/config";
import Picker from './picker'
import {ifSwitch} from '@/utils/common';
import {connect} from 'dva'
import InputPassword from '@/components/inputPassword/'

const Item = Flex.Item

@connect(({tradeList}) => ({
    position_list: tradeList.position_list.list
}))

export default class extends Component {
    state = {
        data: {},
        code: '',
        code_name: '',
        priceType: [
            {title: '市价', value: 1, choose: true},
            {title: '限价', value: 2, choose: false},
        ],
        num:1,
        show:false
    }
    actionType = ''
    sid = 0
    sid2 = 0
    list = []

    componentWillMount() {
        let data = sessionStorage.getItem(config.K_DATA_LIST);
        console.log(JSON.parse(data))
        if (typeof data != 'undefined') {
            this.assignData(data);
        }
        this.sid = setInterval(() => {
            data = sessionStorage.getItem(config.K_DATA_LIST);
            if (typeof data != 'undefined') {
                this.assignData(data);
                this._getPositionList()
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.sid)
    }
    _getPositionList = () => {
        const {dispatch} = this.props
        dispatch({
            type: 'tradeList/getPositionList'
        })
    }
    _show = () => {
        this.setState({
            show:true
        })
    }
    _hide = () => {
        this.setState({
            show:false
        })
    }
    getList(data) {
        let list = []
        for (let item of JSON.parse(data)) {
            list.push({
                label: item.名称,
                value: item.合约
            })
        }
        return list
    }

    assignData(resource) {
        const list = this.getList(resource)
        let code = ''
        if(this.state.code){
            code = this.state.code
        }else{
            code = list[0]['value']
            const code_name = list[0]['label']
            this.setState({
                code_name:code_name
            })
        }
        const data = JSON.parse(resource).filter(item => item.合约 === code)[0];
        this.list = list
        this.setState({
            data: data,
            code: code
        })
    }
    _picker = v => {
        const code = v[0]
        const code_name = this.list.filter(item => item.value === code)[0]['label']
        this.setState({
            code:code,
            code_name:code_name
        })
    }
    _chooseType = (type) => () =>{
        let priceType = this.state.priceType
        priceType.forEach((v,i) => {
            if(v.choose){
                if(type === 'del' && (i - 1) >= 0){
                    priceType[i-1]['choose'] = true
                    priceType[i]['choose'] = false
                }
                if(type === 'add' && (i + 1) < priceType.length){
                    priceType[i+1]['choose'] = true
                    priceType[i]['choose'] = false
                }
            }
        })
        this.setState({
            priceType:priceType
        })
    }
    _getTypeValue = () => {
        const value = this.state.priceType.filter(item => item.choose)[0]['value']
        return value
    }
    _submit = type => () => {
        const {dispatch} = this.props
        const typeValue = this._getTypeValue()
        if(typeValue === 1){
            ifSwitch(`是否${type}？`,() => {
                dispatch({
                    type: 'trade/newOrder',
                    direction: type,
                    code:this.state.code,
                    num:this.state.num
                })
            })
        }
        if(typeValue === 2){
            this.actionType = type
            this._show()
        }
    }
    _submitDriect = () => {
        const {dispatch} = this.props
        ifSwitch(`是否${this.actionType}？`,() => {
            dispatch({
                type: 'trade/newOrder',
                direction: this.actionType,
                code:this.state.code,
                num:this.state.num
            })
        })
    }
    _ping = () => {
        const {dispatch} = this.props
        ifSwitch('确认平仓？',() => {
            dispatch({
                type: 'trade/ping',
                code: this.state.code
            })
        })
    }
    _limnitAction = v => {
        const {dispatch} = this.props
        const data = this.state.data
        if(v){
            const direction = this.actionType
            if(direction === '买入' && v > data.最新价){
                Toast.info('买入需低于最新价',1)
                return
            }
            if(direction === '卖出' && v < data.最新价){
                Toast.info('卖出需高于最新价',1)
                return
            }
            dispatch({
                type: 'trade/newOrder',
                direction: direction,
                code:this.state.code,
                price:v,
                num: this.state.num,
                price_type:'限价'
            })
        }
    }
    _add = () => {
        this.setState({
            num:this.state.num + 1
        })
    }
    _del = () => {
        this.setState({
            num:this.state.num - 1 > 0 ? this.state.num - 1 : 1
        })
    }
    _renderLin1 = () => {
        const {position_list} = this.props
        const item = position_list.filter(item => item.合约 === this.code)[0]
        const earn = item ? item['浮动盈亏'] : 0
        return (
            <Flex>
                <Flex className={styles.box}>
                    <Flex className={styles.input}>
                        <Picker
                            data={this.list}
                            onChange={this._picker}
                        />
                        <Item className={styles.value}>
                            {this.state.code_name}
                        </Item>
                        <Item className={styles.btn}></Item>
                    </Flex>
                </Flex>
                <Item className={styles.title}>最新</Item>
                <Flex className={styles.float} data-color={earn > 0 ? 'up' : 'down'}>
                    <Item>
                        {this.state.data.最新价 || '--'}
                    </Item>
                    <Item>
                        {earn}
                    </Item>
                </Flex>
            </Flex>
        )
    }
    _renderLin2 = () => {
        return (
            <Flex>
                <Flex className={styles.box}>
                    <Item className={styles.unit}>手数</Item>
                    <Flex className={styles.input}>
                        <Item className={styles.del} onClick={this._del}></Item>
                        <Item className={styles.value}>
                            {this.state.num}
                        </Item>
                        <Item className={styles.add} onClick={this._add}></Item>
                    </Flex>
                </Flex>
                <Item className={styles.title}>卖价</Item>
                <Flex className={styles.float}>
                    <Item>
                        {this.state.data.卖价 || '--'}
                    </Item>
                    <Item>
                        {this.state.data.卖量 || '--'}
                    </Item>
                </Flex>
            </Flex>
        )
    }
    _renderLin3 = () => {
        return (
            <Flex>
                <Flex className={styles.box}>
                    <Item className={styles.unit}>价格</Item>
                    <Flex className={styles.input}>
                        <Item className={styles.del} onClick={this._chooseType('del')}></Item>
                        <Item className={styles.value}>
                            {this.state.priceType.filter(item => item.choose)[0]['title']}
                        </Item>
                        <Item className={styles.add} onClick={this._chooseType('add')}></Item>
                    </Flex>
                </Flex>
                <Item className={styles.title}>买价</Item>
                <Flex className={styles.float}>
                    <Item>
                        {this.state.data.买价 || '--'}
                    </Item>
                    <Item>
                        {this.state.data.买量 || '--'}
                    </Item>
                </Flex>
            </Flex>
        )
    }
    _renderBtns = () => {
        return (
            <Flex className={styles.submit}>
                <Item className={styles['submit-btn']} onClick={this._submit('买入')}>
                    <div>{this.state.data.买价}</div>
                    <div>买</div>
                </Item>
                <Item className={styles['submit-btn']} onClick={this._submit('卖出')}>
                    <div>{this.state.data.卖价}</div>
                    <div>卖</div>
                </Item>
                <Item className={styles['submit-btn']} onClick={this._ping}>
                    <div>{this.state.data.买价}</div>
                    <div>平</div>
                </Item>
            </Flex>
        )
    }
    render() {
        return (
            <div className={styles.container}>
                {this._renderLin1()}
                {this._renderLin2()}
                {this._renderLin3()}
                {this._renderBtns()}
                <InputPassword
                    visible={this.state.show}
                    hide={this._hide}
                    finish={v => this._limnitAction(v)}
                    data={this.state.data}
                    actionType={this.actionType}
                    submit={this._submitDriect}
                />
            </div>
        )
    }
}
