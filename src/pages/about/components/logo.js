import CSSModules from 'react-css-modules'
import styles from '../styles/logo.less'
import logo from '../images/logo.png'

const Logo = () => (
    <div>
        <div>
            <img src={logo} alt="" styleName="logo"/>
        </div>
        <p styleName="det">安全、正规、专业</p>
    </div>
)

export default CSSModules(Logo,styles)
