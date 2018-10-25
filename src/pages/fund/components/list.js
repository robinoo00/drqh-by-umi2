import {List} from 'antd-mobile'
import {removeScrollListener, scrollLoadMore, reBuildDate, reBuildTime} from "../../../utils/common";
import React from 'react'
import {connect} from 'dva'
import NoMore from '../../../components/loading-nomore/bottom-tip'

const Item = List.Item;
const Brief = Item.Brief;


class FundList extends React.Component {
    componentDidMount() {
        let {loadMore, getList} = this.props;
        getList();
        scrollLoadMore(() => {
            loadMore()
        })
    }

    componentWillUnmount() {
        removeScrollListener()
    }

    render() {
        const {...rest} = this.props;
        return (
            <div className="fund-list">
                {rest.list.map((item, index) => (
                    <Item
                        key={"fund_list_" + index}
                        extra={<div><p className={item.金额 > 0 ? 'up-color' : 'down-color'} style={{fontSize: '.16rem'}}>{new Number(item.金额).toFixed(2)}</p><p>账号:{item.账号}</p></div>}
                    ><p style={{fontSize: '.16rem', color: '#999'}}>{item.类型 === '劣后' ? '自有' : '授信'}</p>
                        <Brief style={{fontSize: '.12rem'}}>{item.日期}</Brief></Item>
                ))}
                <NoMore nomore={rest.nomore}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.fund.list,
    nomore: state.fund.nomore,
})

const mapDispatchToProps = (dispatch, props) => ({
    getList: () => {
        dispatch({
            type: 'fund/getList'
        })
    },
    loadMore:() => {
        dispatch({
            type:'fund/loadMore'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FundList)
