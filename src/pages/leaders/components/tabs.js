import {Tabs} from 'antd-mobile'
import List from './list'
import Nav from './nav'
import {connect} from 'dva'
import {removeScrollListener, scrollLoadMore} from "../../../utils/common";
import React from 'react'

class LeadersTabs extends React.Component{
    componentDidMount(){
        let {loadMore,getList} = this.props;
        getList();
        scrollLoadMore(() => {
            loadMore()
        })
    }
    componentWillUnmount(){
        removeScrollListener()
    }
    render(){
        const {...rest} = this.props;
        return(
            <Tabs
                tabs={rest.tabs}
                renderTab={(tabs) => <Nav tab={tabs}/>}
                initialPage={rest.tabs.indexOf(rest.tabs.filter(item => item.choose)[0])}
                swipeable={false}
                tabBarBackgroundColor={'#262834'}
                onChange={(tab, index) => {
                    // console.log('onChange', index, tab);
                }}
                onTabClick={rest.choose}
            >
                <List list={rest.list_earn.list}/>
                <List list={rest.list_win.list}/>
                <List list={rest.list_hot.list}/>
            </Tabs>
        )
    }
}

const mapStateToProps = state => ({
    tabs:state.leaders.tabs,
    list_earn:state.leaders.list_earn,
    list_win:state.leaders.list_win,
    list_hot:state.leaders.list_hot,
})

const mapDispatchToProps = dispatch => ({
    getList:() => {
        dispatch({
            type:'leaders/getList',
        })
    },
    loadMore:() => {
        dispatch({
            type:'leaders/loadMore',
        })
    },
    choose:(tab, index) => {
        dispatch({
            type:'leaders/assignTabs',
            choose_index:index
        })
        dispatch({
            type:'leaders/getList',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(LeadersTabs)
