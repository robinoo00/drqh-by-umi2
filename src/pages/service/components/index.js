import CSSModules from 'react-css-modules'
import styles from '../styles/index.less'
import Header from '../../../components/header/header'
import wxIcon from '../images/wx.png'
import qqIcon from '../images/qq.png'
import bgIcon from '../images/content@2x.png'
import {copyToClipboard} from "../../../utils/common";

const Service = () => (
    <div style={{height:'100vh',backgroundColor:'#fff'}}>
        <Header
            title={'在线服务'}
        />
        <div>
            <div styleName="sec_one">
                <div styleName="dialog-w">
                    <p onClick={() => {copyToClipboard('coincs')}}>
                        <img src={wxIcon} alt=""/>
                        微信：
                        <span>123</span>
                    </p>
                    <p onClick={() => {copyToClipboard('3087237833')}}>
                        <img src={qqIcon} alt=""/>
                        QQ：
                        <span style={{width:'1rem'}}>123</span>
                    </p>
                </div>
                <img style={{width:'100%'}} src={bgIcon} alt=""/>
            </div>
            <div styleName="btn_container">
                <a styleName="buttonRed" href="">点击联系我</a>
                <div styleName="time">
                    <p>在线时间：</p>
                    <p>周一至周日 9:00-24:00 </p>
                </div>
                <div styleName="fixfooter">
                    若您已完成转账操作，请您将转账【安全码】或转账截图 发给客服，以此加快您的资金到账速度
                </div>
            </div>
        </div>
    </div>
)

export default CSSModules(Service,styles)
