import CSSModules from 'react-css-modules'
import styles from '../styles/edit.less'
import {Flex} from 'antd-mobile'
import AddDelInput from '../../../components/del-input-add/'
import {connect} from 'dva'

const Nums = ({...rest}) => (
    <Flex styleName="line">
        <Flex.Item styleName="left">
            跟随手数
        </Flex.Item>
        <Flex.Item>
            <div style={{width: '150px'}}>
                <AddDelInput
                    delCallBack={rest.del(rest.num)}
                    addCallBack={rest.add(rest.num)}
                    inputCallBack={rest.change}
                    value={rest.num}
                />
            </div>
        </Flex.Item>
    </Flex>
)

const mapStateToProps = state => ({
    num: state.followEdit.way === "固定手数" ? state.followEdit.num : state.followEdit.num1,
})

const mapDispatchToProps = dispatch => ({
    add: value => () => {
        console.log(value);
        dispatch({
            type: 'followEdit/assignNum',
            value: parseInt(value) + 1
        })
    },
    del: value => () => {
        dispatch({
            type: 'followEdit/assignNum',
            value: (parseInt(value) - 1) <= 1 ? 1 : parseInt(value) - 1
        })
    },
    change: e => {
        const value = e.target.value;
        dispatch({
            type: 'followEdit/assignNum',
            value: value <= 1 ? 1 : value
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Nums, styles))
