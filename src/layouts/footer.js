import CSSModules from 'react-css-modules'
import styles from './style.less'
import Link from 'umi/link'
import {connect} from 'dva'
import router from 'umi/router'
import {Flex} from 'antd-mobile'

const list = [
    {url:'/home',text:'首页',c:'home',ca:'home-active',active:['/','/home']},
    {url:'/tradeList',text:'持仓',c:'hold',ca:'hold-active',active:['/tradeList']},
    {url:'/helpCenter',text:'客服',c:'discuss',ca:'',active:['/followList']},
    {url:'/personal',text:'我的',c:'personal',ca:'personal-active',active:['/personal']},
];
const Footer = ({pathname}) => (
    <div styleName="footer">
        <Flex styleName="ul">
            {list.map(item => (
                <Flex.Item styleName="li" key={item.text} onClick={() => {router.push({pathname:item.url})}}>
                    <Link to={item.url} styleName={item.active.includes(pathname) ? item.ca : item.c}></Link>
                    <em>{item.text}</em>
                </Flex.Item>
            ))}
        </Flex>
    </div>
)

const mapStateToProps = state =>({
    pathname:state.routing.location.pathname
})

export default connect(mapStateToProps)(CSSModules(Footer,styles))


