import CSSModules from 'react-css-modules'
import styles from '../styles/edit.less'
import {Flex} from 'antd-mobile'
import {connect} from 'dva'

const Ways = ({...rest}) => (
    <Flex styleName="line">
        <Flex.Item styleName="left">
            跟随方向
        </Flex.Item>
        <Flex.Item styleName="right">
            <div onClick={rest.choose(0)} styleName={rest.direct === 0 ? "btn1" : "btn2"}>正向</div>
        </Flex.Item>
        <Flex.Item styleName="right">
            <div onClick={rest.choose(1)} styleName={rest.direct === 1 ? "btn1" : "btn2"}>反向</div>
        </Flex.Item>
    </Flex>
)

const mapStateToProps = state => ({
    direct: state.followEdit.direct,
})

const mapDispatchToProps = dispatch => ({
    choose: value => () => (
        dispatch({
            type: 'followEdit/assignItem',
            name:'direct',
            value: value
        })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Ways, styles))
