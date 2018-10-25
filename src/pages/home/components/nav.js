import CSSModules from 'react-css-modules'
import styles from '../styles/nav.less'
import icon1 from '../images/nav1.png'
import icon2 from '../images/nav2.png'
import icon3 from '../images/nav3.png'
import icon4 from '../images/nav4.png'
import router from 'umi/router'
import {Flex} from 'antd-mobile'
import {server} from '@/utils/config'

const list = [
    {text:'金融资讯',icon:icon1,url:'news'},
    {text:'进阶必备',icon:icon2,url:'knowledge'},
    {text:'风险提示',icon:icon3,url:'guide'},
    {text:'最新公告',icon:icon4,url:'introduce',query:1},
]

const link = (item) => () => {
    if(item.text === '最新公告'){
        sessionStorage.setItem('guide_title','最新公告')
    }
    router.push({pathname:item.url,query:item.query})
}

const Nav = () => (
    <Flex styleName="nav-wrap">
        {list.map(item => (
            <Flex.Item styleName="li" key={item.text} onClick={link(item)}>
                <img src={item.icon} alt=""/>
                <p>{item.text}</p>
            </Flex.Item>
        ))}
    </Flex>
)

export default CSSModules(Nav,styles)
