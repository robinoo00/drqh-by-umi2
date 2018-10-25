import CSSModules from 'react-css-modules'
import styles from '../styles/undeal-list.less'
import {connect} from 'dva'
import {List, WhiteSpace, Modal} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

const UnDealList = ({list, cancel}) => {
    return (
        <div>
            <WhiteSpace size={"md"}/>
            {list.map((item, index) => (
                <div key={"deal_list_" + index}>
                    <Item
                        extra={
                            <div>
                                <p style={item['方向'] === "买入" ? {color: '#E34C4D'} : {color: "#01B28E"}}>{item['方向']}{item['数量']}手<a
                                    styleName={'cancel'} onClick={() => cancel(item.单号)}>撤单</a></p>
                                <Brief>￥{item['价格']}</Brief>
                            </div>}
                    >
                        <p style={{fontSize: '.17rem'}}>{item['合约']} <span
                            style={{fontSize: '.14rem'}}>（类型:{item['类型']}）</span></p>
                        <Brief style={{fontSize: '.1rem'}}>{item['时间']}</Brief>
                    </Item>
                    <WhiteSpace size={"sm"}/>
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = state => ({
    list: state.tradeList.undeal_list.list
})

const mapDispatchToProps = (dispatch, props) => ({
    cancel: (orderID) => {
        Modal.alert('撤单', '确认撤单？', [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '确定', onPress: () => {
                    dispatch({
                        type: 'tradeList/cancel',
                        orderID: orderID
                    })
                }
            }
        ])
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(UnDealList, styles))

