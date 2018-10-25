import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'
import {Flex} from 'antd-mobile'

const Operation = ({...rest}) => {
    return (
        <Flex style={{padding:'.1rem'}}>
            <Flex.Item className={'trade-num-btn'}>
                <Flex styleName="num-choose">
                    <Flex.Item>
                        <div styleName="del-item" onClick={rest.delNum(rest.num)}>-</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div styleName="num-input">
                            <input type="number" onChange={rest.inputNum} value={rest.num}/>
                        </div>
                    </Flex.Item>
                    <Flex.Item>
                        <div styleName="add-item" onClick={rest.addNum(rest.num)}>+</div>
                    </Flex.Item>
                </Flex>
            </Flex.Item>
            <Flex.Item>
                <Flex>
                    <Flex.Item style={{marginLeft:'0'}}>
                        <Flex styleName="price-item" onClick={rest.chooseType(1)}>
                            <Flex.Item>
                                <div styleName={rest.type === 1 ? "checkbox-icon-choose" : "checkbox-icon"}></div>
                            </Flex.Item>
                            <Flex.Item style={{marginLeft:0}}>
                                <div styleName="price-title">市价</div>
                            </Flex.Item>
                        </Flex>
                    </Flex.Item>
                    <Flex.Item style={{marginLeft:'0'}}>
                        <Flex styleName="price-item" onClick={rest.chooseType(2)}>
                            <Flex.Item>
                                <div styleName={rest.type === 2 ? "checkbox-icon-choose" : "checkbox-icon"}></div>
                            </Flex.Item>
                            <Flex.Item style={{marginLeft:0}}>
                                <div styleName="price-title">限价</div>
                            </Flex.Item>
                        </Flex>
                    </Flex.Item>
                </Flex>
            </Flex.Item>
        </Flex>

    );
};

const mapStateToProps = state => ({
    type:state.trade.price_type,
    num:state.trade.num,
})

const mapDispatchToProps = (dispatch,props) => ({
    delNum:num => () => {
        dispatch({
            type:'trade/assignNum',
            num:parseInt(num)-1
        })
    },
    addNum:num => () => {
        dispatch({
            type:'trade/assignNum',
            num:parseInt(num)+1
        })
    },
    inputNum:(e) => {
        dispatch({
            type:'trade/assignNum',
            num:e.target.value
        })
    },
    chooseType:value => () => {
        dispatch({
            type:'trade/assignPriceType',
            value:value
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Operation, styles))

