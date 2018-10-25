import CSSModuels from 'react-css-modules'
import styles from '../styles/money.less'
import bg1 from '../images/bg1.png'
import bg2 from '../images/bg2.png'
import router from 'umi/router'

const Money = ({info}) => (
    <div styleName="money-wrap">
        <img src={bg1} alt="" styleName="bg1"/>
        <img src={bg2} alt="" styleName="bg2"/>
        <div styleName="last">余额：{info.可用资金}</div>
        <div styleName="extra">
            <span styleName="topup" onClick={() => router.push('payType')}>充值</span>
            <span styleName="get" onClick={() => router.push('withdraw')}>提现</span>
        </div>
    </div>
)

export default CSSModuels(Money,styles)
