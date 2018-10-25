import CSSModules from 'react-css-modules'
import styles from '../styles/otc.less'
import {InputItem} from 'antd-mobile'
import {createForm} from 'rc-form'
import Button from '../../../components/button/button'
import Protocol from '../../../components/protocol/'
import {connect} from 'dva'


// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

const Otc = ({...rest}) => (
    <div>
        <div styleName="tip">
            OTC交易及到账时间为09:00-24:00
        </div>
        <div styleName="extend">
            <span styleName="what">什么是OTC</span>
        </div>
        <div styleName="account">
            <p>CNY -> USDT</p>
            <p><span styleName="title">签约商户</span>：某某</p>
            <p><span styleName="title">单价</span>：某某</p>
        </div>
        <div styleName="topup">
            <span><InputItem
                {...rest.form.getFieldProps('money2', {
                    normalize: (v, prev) => {
                        if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                            if (v === '.') {
                                return '0.';
                            }
                            return prev;
                        }
                        return v;
                    },
                })}
                type={"money"}
                placeholder="最少可买20"
                ref={el => this.inputRef = el}
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                extra={'USDT'}
            >我想购买</InputItem></span>
        </div>
        <div styleName="need">需花费￥0</div>
        <div style={{padding:'5px 12px'}}>
            <Button
                title={'下单'}
                bgColor={'#d0d1d5'}
            />
        </div>
        <Protocol
            callBack={rest.assignProtocol}
            choose={rest.protocol}
        />
    </div>
)

const mapStateToProps = state => ({
    protocol:state.charge.protocol
})

const mapDispatchToProps = dispatch => ({
    assignProtocol:() => {
        dispatch({
            type:'charge/assignProtocol'
        })
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(CSSModules(Otc,styles)))
