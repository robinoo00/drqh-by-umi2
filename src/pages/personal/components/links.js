import CSSModuels from 'react-css-modules'
import styles from '../styles/links.less'
import icon from '../images/kefu.png'
import router from 'umi/router'

const Links = () => (
    <div styleName="links-wrap">
        <ul styleName="links">
            <li onClick={() => router.push('helpCenter')}>
                联系客服
                <img src={icon} alt=""/>
            </li>
            <li onClick={() => router.push('guide')}>风险提示</li>
            <li onClick={() => router.push('help')}>帮助中心</li>
            <li onClick={() => router.push('myInfo')}>账户设置</li>
        </ul>
    </div>
)

export default CSSModuels(Links,styles)
