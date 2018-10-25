import CSSModules from 'react-css-modules'
import styles from '../styles/index.less'
import icon from '../images/icon.png'
import {connect} from 'dva'

const Item = ({data}) => (
    <div styleName= 'bank-item'>
        <div styleName="line1">
            <div styleName="icon">
                <img src={icon} alt=""/>
            </div>
            <div styleName="info">
                <div styleName="bank">{data.绑定银行}</div>
                <div styleName="name">{data.持卡人}</div>
            </div>
        </div>
        <div styleName="line2">
            <div styleName="num">{data.银行卡号}</div>
        </div>
    </div>
)

const mapStateToDispatch = state => ({
    data:state.personal.info
})

export default connect(mapStateToDispatch)(CSSModules(Item,styles))
