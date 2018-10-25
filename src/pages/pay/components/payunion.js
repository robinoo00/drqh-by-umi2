import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import icon from '../images/icon-bank-cmb.png'

const Example = ({...rest}) => {
    return (
        <div styleName="page-pay-union">
            <section styleName="mod-wrap">
                <ul>
                    <li styleName="clearfix">
                        <div styleName="fl">
                            <img src={icon}/>
                        </div>
                        <div styleName="fl">
                            <h3>576900926110801</h3>
                            <p>台州盈鸿网络科技有限公司</p>
                            <p>招商银行股份有限公司台州温岭支行</p>
                        </div>
                    </li>
                </ul>
                <div styleName="tips">
                    <p>温馨提示：</p>
                    <p>1、转账时请仔细核对卡号、户名及支行信息，避免操作出错；</p>
                    <p>2、转账时请备注您在平台注册的用户名和手机号码，以便财务核对及时入账；</p>
                    <p>3、转账成功后请保存好交易回执单并及时致电平台客服：400-8898-917；</p>
                </div>
            </section>
        </div>
    );
};

const mapStateToProps = state => ({
    headerText:state.pay.headerText
})

const mapDispatchToProps = (dispatch,props) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

