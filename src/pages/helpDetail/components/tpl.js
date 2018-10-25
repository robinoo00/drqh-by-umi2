import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {List} from 'antd-mobile'
import router from 'umi/router'
import icon from '../images/icon-tel.png'
import config from '../../../utils/config'
// const Item = List.Item

const Example = ({con}) => {
    return (
        <div>
            <Header
                title={'问题详情'}
                leftCallBack={() => {router.goBack()}}
                rightText={<a href={"tel:"+config.SERVICE_TEL}><img style={{width:'.2rem'}} src={icon}/></a>}
            />
            <div styleName="mod-help-detail">
                <h3>{sessionStorage.getItem('help_title')}</h3>
                <div styleName="content" dangerouslySetInnerHTML={{
                    __html: con
                }}></div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    con:state.helpDetail.con
})

const mapDispatchToProps = (dispatch,props) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

