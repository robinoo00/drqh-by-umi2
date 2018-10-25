import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import AliPay from './alipay'
import PayUnion from './payunion'
import React from 'react'

const Example = ({...rest}) => {
    return (
        <div>
            <Header
                title={rest.headerText}
                url={'/payType'}
            />
            {rest.type === 'alipay' ? <AliPay/> : ''}
            {rest.type === 'payunion' ? <PayUnion/> : ''}
        </div>
    );
};

const mapStateToProps = state => ({
    headerText:state.pay.headerText,
    type:state.pay.type
})

const mapDispatchToProps = (dispatch,props) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

