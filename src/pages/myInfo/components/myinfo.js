import CSSModules from 'react-css-modules'
import styles from '../styles/myinfo.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {List, Modal,Switch} from 'antd-mobile'
import icon from '../images/icon-head.png'
import router from 'umi/router'
import config from '../../../utils/config'
import person from '../../personal/images/person.png'

const Item = List.Item;

const Example = ({data,loginOut,assignTrade,trade}) => {
    return (
        <div className={'myinfo'}>
            <Header
                title={'我的信息'}
            />
            <List>
                <Item
                    thumb={<img style={{width: '.5rem', height: 'auto', margin: '0.25rem 0'}} src={person}/>}
                >
                    <div style={{fontSize: '.2rem', color: '#fff'}}>{data.持卡人}</div>
                </Item>
            </List>
            <List style={{marginTop: '.1rem'}}>
                <Item
                    extra={data.帐号}
                    // arrow={'horizontal'}
                >账号</Item>
                <Item
                    onClick={() => {
                        router.push({pathname: '/myInfoModify'})
                    }}
                    extra={'修改'}
                    arrow={'horizontal'}
                >登录密码</Item>
                <Item
                    extra={<Switch
                        onClick={assignTrade}
                        checked={trade}
                    />}
                >交易需确认</Item>
            </List>
            <List style={{marginTop: '.1rem'}}>
                <Item
                    extra={data.身份证号}
                    wrap={true}
                    // arrow={'horizontal'}
                >身份证号</Item>
            </List>
            <List style={{marginTop: '.1rem'}}>
                <Item
                    onClick={() => {router.push('about')}}
                arrow={'horizontal'}
                >关于我们</Item>
                <Item
                    extra={data.银行卡号}
                    // arrow={'horizontal'}
                >我的银行卡</Item>
                {/*<Item*/}
                    {/*extra={data.持卡人}*/}
                    {/*// arrow={'horizontal'}*/}
                {/*>持卡人</Item>*/}
                {/*<Item*/}
                    {/*extra={data.绑定银行}*/}
                    {/*// arrow={'horizontal'}*/}
                {/*>银行</Item>*/}
            </List>
            <List style={{marginTop: '.1rem'}}>
                <Item
                    arrow={'horizontal'}
                    onClick={loginOut}
                >
                    <p style={{color: '#ff2727'}}>退出登录</p>
                </Item>
            </List>
        </div>
    );
};

const mapStateToProps = state => ({
    data: state.personal.info,
    trade:localStorage.getItem(config.TRADE_SWITCH) === null ? true : localStorage.getItem(config.TRADE_SWITCH) === "true" ? true : false
})

const mapDispatchToProps = (dispatch, props) => ({
    assignTrade:(checked) => {
        localStorage.setItem(config.TRADE_SWITCH,checked)
    },
    loginOut: () => {
        dispatch({
            type:'login/loginOut'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Example, styles))

