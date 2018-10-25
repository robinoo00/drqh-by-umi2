import CSSModules from 'react-css-modules'
import styles from '../styles/ping-check-alert.less'
import {Flex, Toast, Modal} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'

class Item extends React.Component {
    render() {
        const {submit,item, hidePingModal, visible,assignPingNum,num} = this.props;
        return (
            <div>
                <Modal
                    visible={visible}
                    transparent
                    maskClosable={true}
                    onClose={() => {hidePingModal()}}
                    title="确认平仓?"
                    footer={
                        [
                            {text: '取消', onPress: hidePingModal},
                            {
                                text: '确定', onPress: () => {
                                    submit(item)
                                }
                            },
                        ]
                    }
                    // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div>
                        <p style={{color: '#bcbcbc'}}> 合约号:{item.合约}</p>
                        <br/>
                        <Flex><Flex.Item styleName={'left'}>浮动盈亏:</Flex.Item>&nbsp;&nbsp;<Flex.Item
                            style={{color: '#E34C4D'}}>{item.浮动盈亏}</Flex.Item></Flex>
                        <Flex><Flex.Item styleName={'left'}>开仓价:</Flex.Item>&nbsp;&nbsp;<Flex.Item>{item.均价}</Flex.Item></Flex>
                        <Flex><Flex.Item styleName={'left'}>当前价:</Flex.Item>&nbsp;&nbsp;
                            <Flex.Item>{item.当前价}</Flex.Item></Flex>
                        <Flex styleName="num-choose">
                            <Flex.Item>
                                <div styleName="del-item" onClick={() => {
                                    assignPingNum(num - 1)
                                }}>-
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div styleName="num-input">
                                    <input type="number" value={num} readOnly/>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div styleName="add-item" onClick={() => {
                                    assignPingNum(num + 1)
                                }}>+
                                </div>
                            </Flex.Item>
                        </Flex>
                    </div>
                </Modal>
            </div>
        )
    }
}

// const Item = ({item,num,hidePingModal,visible,assignPingNum}) => (
//
// )

// const Item = ({item,del,add,num}) => (
//     <div>
//         <p style={{color: '#bcbcbc'}}> 合约号:{item.合约}</p>
//         <br/>
//         <Flex><Flex.Item styleName={'left'}>浮动盈亏:</Flex.Item>&nbsp;&nbsp;<Flex.Item
//             style={{color: '#E34C4D'}}>{item.浮动盈亏}</Flex.Item></Flex>
//         <Flex><Flex.Item styleName={'left'}>开仓价:</Flex.Item>&nbsp;&nbsp;<Flex.Item>{item.均价}</Flex.Item></Flex>
//         <Flex><Flex.Item styleName={'left'}>当前价:</Flex.Item>&nbsp;&nbsp;<Flex.Item>{item.当前价}</Flex.Item></Flex>
//         <Flex styleName="num-choose">
//             <Flex.Item>
//                 <div styleName="del-item" onClick={del}>-</div>
//             </Flex.Item>
//             <Flex.Item>
//                 <div styleName="num-input">
//                     <input type="number" value={num}/>
//                 </div>
//             </Flex.Item>
//             <Flex.Item>
//                 <div styleName="add-item" onClick={add}>+</div>
//             </Flex.Item>
//         </Flex>
//     </div>
// )

const mapStateToProps = state => ({
    item: state.tradeList.ping_modal.item,
    visible: state.tradeList.ping_modal.show,
    num: state.tradeList.ping_modal.num
})

const mapDispatchToProps = dispatch => ({
    assignPingNum: (num) => {
        dispatch({
            type: 'tradeList/assignPingNum',
            num: num
        })
    },
    hidePingModal: () => {
        console.log(123);
        dispatch({
            type: 'tradeList/hidePingModal'
        })
    },
    submit: (item) => {
        dispatch({
            type: 'tradeList/ping',
            direction: item.方向 === "买入" ? 0 : 1,
            code: item.合约
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Item, styles))
