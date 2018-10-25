import Header from '../../../components/header/header'
import {connect} from 'dva'
import {Modal} from 'antd-mobile'

const LimitHeader = ({code,rule}) => (
    <Header
        title={`止损止盈(${code})`}
        // rightText={<div>规则</div>}
        // rightCallBack={rule}
    />
)

const mapStateToProps = state => ({
    code:state.limits.code
})

const mapDispatchToProps = dispatch => ({
    rule: () => {
        Modal.alert('规则',<div className={'limit-rule-wrap'}>
            <p>1.云止损止盈支持关闭交易端生效；</p>
            <p>2.下单后不存在止损止盈，需进行添加设置；</p>
            <p>3.设置为点位（非行情价格）比如原油1跳为0.1点，设置5点，为行情价格0.5点；</p>
            <p>4.止损止盈以均价为中心点，设置止损10点即均价反方向10个点位触发生效；</p>
            <p>5.新增/减小仓位后止损止盈将失效，需重新设置；</p>
            <p>6.止损止盈当行情碰到设置点，触发后以市价去平仓，当行情大时，可能存在点差。</p>
        </div>,[
            {text:'我知道了',onPress:() => {

                }}
        ])
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(LimitHeader)
