import CSSModules from 'react-css-modules'
import styles from '../styles/edit.less'
import {Flex} from 'antd-mobile'
import {connect} from 'dva'

const Ways = ({...rest}) => (
    <div>
        <Flex styleName="line">
            <Flex.Item styleName="left">
                跟随方式
            </Flex.Item>
            <Flex.Item styleName="right">
                <div onClick={rest.choose('固定手数')} styleName={rest.way === "固定手数" ? "btn1" : "btn2"}>固定手数跟随</div>
            </Flex.Item>
            <Flex.Item styleName="right">
                <div onClick={rest.choose('固定倍数')} styleName={rest.way === "固定倍数" ? "btn1" : "btn2"}>固定倍数跟随</div>
            </Flex.Item>
        </Flex>
        <Flex styleName="line">
            <Flex.Item styleName="left">
            </Flex.Item>
            <Flex.Item styleName="right">
                <p styleName="text">无论交易员下单多少，您都按选择的固定手数跟随，最小1手</p>
            </Flex.Item>
        </Flex>
    </div>
)

const mapStateToProps = state => ({
    way:state.followEdit.way,
})

const mapDispatchToProps = dispatch => ({
    choose:value => () => (
        dispatch({
            type:'followEdit/assignItem',
            name:'way',
            value:value
        })
    )
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Ways,styles))
