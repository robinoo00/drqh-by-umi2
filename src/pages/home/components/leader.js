import CSSModules from 'react-css-modules'
import styles from '../styles/leader.less'
import {TitleLine} from "./common";
import crown1 from '../images/home_icon_crown1.png';
// import crown2 from '../images/home_icon_crown2.png';
// import crown3 from '../images/home_icon_crown3.png';
// import crown4 from '../images/home_icon_crown4.png';
import apply from '../images/apply.png'

const Leader = () => (
    <div styleName='leader-wrap'>
        <TitleLine text={'交易高手'}/>
        <div styleName="list">
            <ul>
                <li>
                    <div styleName="ear-img">
                        <img src={crown1} styleName="ear-huangguan" alt=""/>
                        <img
                            src="https://digitalsh.oss-cn-shanghai.aliyuncs.com/ueditor/1523414270051070466.png?x-oss-process=image/auto-orient,1"
                            styleName="ear-Portrait"
                            alt=""/>
                        <p styleName="earnings-list-p">
                            <span>451</span>
                            <span>跟随人数</span>
                        </p>
                    </div>
                </li>
                <li styleName="last-li">
                    <img src={apply} alt=""/>
                </li>
            </ul>
        </div>
    </div>
)

export default CSSModules(Leader, styles)
