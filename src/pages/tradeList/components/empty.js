import CSSModules from 'react-css-modules'
import styles from '../styles/empty.less'
import icon from '../images/nothing.png'
import router from 'umi/router'

const Empty = () => (
    <div styleName="empty_img">
        <img src={icon} alt=""/>
        <span>暂无订单</span>
        <div styleName="order-btn">
            <a href="javascript:;" onClick={() => router.push('/home')}>去下单</a>
        </div>
    </div>
)

export default CSSModules(Empty,styles)
