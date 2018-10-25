import CSSModuels from 'react-css-modules'
import styles from '../styles/manager.less'
import icon1 from '../images/icon1.png';
import icon2 from '../images/icon2.png';
import icon3 from '../images/icon3.png';
import icon4 from '../images/icon4.png';
import icon5 from '../images/icon5.png';
import icon6 from '../images/icon6.png';
import router from 'umi/router'
import {Toast} from 'antd-mobile'

const list = [
    {icon:icon1,text:'持仓管理',url:'tradeList'},
    {icon:icon2,text:'投资报表',url:'#'},
    {icon:icon3,text:'银行卡包',url:'banks'},
    {icon:icon4,text:'金融资讯',url:'news'},
    {icon:icon5,text:'资金明细',url:'fund'},
    {icon:icon6,text:'风险提示',url:'guide'},
];

const Manager = () => (
    <div styleName="manager-wrap">
        <div styleName="manager">
            <ul styleName="ul">
                {list.map(item => (
                    <li key={item.text} onClick={() => {if(item.url != '#'){router.push(item.url)}else{Toast.info('暂未开放')}}}>
                        <img src={item.icon} alt=""/>
                        <p>{item.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
)

export default CSSModuels(Manager,styles)
