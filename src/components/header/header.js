import CSSModules from 'react-css-modules'
import styles from './header.css'
import router from 'umi/router'

const Header = ({callBack=() => {},bgColor="#262834",back=true,leftText='',rightText='',rightCallBack = () => {},url = '/',
                    leftCallBack = () => {url === '/' ? router.goBack() : router.push({pathname:url})},title}) => (
    <div styleName="page-header">
      <div styleName="header-wrap" style={{backgroundColor:bgColor}}>
        <h3 onClick={callBack}>{title}</h3>
        {back ? <a onClick={() => {leftCallBack && leftCallBack()}} styleName="nav-left">
          <i styleName="icon-back"></i>
        </a> : <div styleName="nav-left" onClick={() => {leftCallBack && leftCallBack()}}>{leftText}</div>}
        <div styleName="nav-right" onClick={rightCallBack}>
          {rightText}
        </div>
      </div>

    </div>
)

export default CSSModules(Header,styles)
