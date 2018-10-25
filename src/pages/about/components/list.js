import {List} from 'antd-mobile'
import router from 'umi/router'
import config from '../../../utils/config'

const Item = List.Item

const AboutList = () => (
    <List>
        <Item
            arrow={'horizontal'}
            onClick={() =>{router.push({pathname:'newsDetail',query:{type:config.NEWS_PROD}})}}
        >
            产品相关介绍
        </Item>
        <Item
            arrow={'horizontal'}
            onClick={() =>{router.push({pathname:'newsDetail',query:{type:config.NEWS_SECRET}})}}
        >
            免责及隐私声明
        </Item>
    </List>
)

export default AboutList
