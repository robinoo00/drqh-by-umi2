import {List, Flex, Modal} from 'antd-mobile'
import {reBuildDate, reBuildTime} from "../../../utils/common";
// import {removeScrollListener, scrollLoadMore, reBuildDate, reBuildTime} from "../../../utils/common";
import React from 'react'
import {connect} from 'dva'
// import NoMore from '../../../components/loading-nomore/bottom-tip'
import CSSModules from 'react-css-modules'
import styles from '../styles/list.less'

const Item = List.Item;
const Brief = Item.Brief;

let id = 0;

class FundList extends React.Component {
    componentDidMount() {
        let {loadMore, getList} = this.props;
        getList();
        id = setInterval(() => {
            getList();
        },1000)
        // scrollLoadMore(() => {
        //     loadMore()
        // })
    }

    componentWillUnmount() {
        // removeScrollListener()
        clearInterval(id)
    }

    render() {
        const {...rest} = this.props;
        return (
            <div className="limits-list">
                {rest.list.map((item, index) => (
                    <div styleName="item" key={"tradeList_" + index}>
                        <div styleName="line1">
                            <div styleName="info">
                                <div styleName="info-item">
                                    <span styleName="name">{item.Symbol}</span>
                                    <span
                                        styleName={item.Buysell === "买入" ? "down" : "up"}>{item.Buysell === "买入" ? "买" : "卖"}</span>
                                    <span>×{item.qty}手</span>
                                </div>
                                <div styleName="info-item">
                                    <span styleName="time">{item.submitTime}</span>
                                </div>
                            </div>
                            <div styleName="action">
                                <span onClick={() => {
                                    rest.cancel(item)
                                }} styleName="ping-btn">删除</span>
                                <span onClick={rest.modify(item)} styleName="ping-btn">修改</span>
                            </div>
                        </div>
                        <Flex styleName="price">
                            <Flex.Item styleName="price-item">
                                <p>{item.MarketPrice}</p>
                                <p>市场价</p>
                            </Flex.Item>
                            <Flex.Item styleName="price-item">
                                <p>{item.slPrice}</p>
                                <p>止损价</p>
                            </Flex.Item>
                            <Flex.Item styleName="price-item">
                                <p>{item.tpPrice}</p>
                                <p>止盈价</p>
                            </Flex.Item>
                            <Flex.Item styleName="price-item">
                                <p>{item.qty}</p>
                                <p>手数</p>
                            </Flex.Item>
                        </Flex>
                    </div>
                ))}
                {/*<NoMore nomore={rest.nomore}/>*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.limits.list,
    nomore: state.limits.nomore,
})

const mapDispatchToProps = (dispatch, props) => ({
    getList: () => {
        dispatch({
            type: 'limits/getList'
        })
    },
    loadMore: () => {
        dispatch({
            type: 'limits/loadMore'
        })
    },
    cancel: (item) => {
        Modal.alert('删除', `确认删除${item.Symbol}吗？`, [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '确定', onPress: () => {
                    dispatch({
                        type: 'limits/cancel',
                        id: item.id
                    })
                }
            }
        ])
    },
    modify: item => () => {
        dispatch({
            type:'limits/assignLimitEarnData',
            data:item
        })
        dispatch({
            type:'limits/assignInputsValue',
            data:item
        })
        dispatch({
            type:'limits/showLimitEarn',
            data:item
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(FundList, styles))
