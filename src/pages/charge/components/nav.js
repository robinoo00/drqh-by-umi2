import CSSModules from 'react-css-modules'
import styles from '../styles/nav.less'
import {connect} from 'dva'

const Nav = ({nav}) => (
    <div styleName="nav-wrap">
        {nav.map(item => (
            <span key={item.text} styleName={item.choose ? "nav-item-active" : "nav-item"}>{item.text}</span>
        ))}
    </div>
)

const mapStateToProps = state => ({
    nav:state.charge.nav
})

export default connect(mapStateToProps)(CSSModules(Nav,styles))
