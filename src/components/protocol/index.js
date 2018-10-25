import CSSModules from'react-css-modules'
import styles from './style.less'

const Protocol = ({choose,callBack}) => (
    <div styleName="wrap">
        <span onClick={callBack} styleName={choose ? "icon-active" : "icon"}></span>
        <span styleName="text">我已阅读并同意</span>
        <span styleName="pro">《充币服务协议》</span>
    </div>
)

export default CSSModules(Protocol,styles)
