import Header from '../../../components/header/header'
import List from './list'
import {Tabs} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'
import {removeScrollListener, scrollLoadMore} from "../../../utils/common";

class News extends React.Component{
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
            <div>
                <Header
                    title={'金融资讯'}
                />
                <div className="news-tab-wrap">
                    <Tabs
                        tabs={rest.tabs}
                        tabBarPosition={"top"}
                        // renderTab={(tabs) => <Nav tab={tabs}/>}
                        initialPage={rest.tabs.indexOf(rest.tabs.filter(item => item.choose)[0])}
                        swipeable={false}
                        tabBarBackgroundColor={'#262834'}
                        onChange={(tab, index) => {
                            // console.log('onChange', index, tab);
                        }}
                        onTabClick={rest.choose}
                    >
                        <List list={rest.list_info}/>
                        <List list={rest.list_finance}/>
                    </Tabs>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tabs:state.news.tabs,
    list_info:state.news.list_info,
    list_finance:state.news.list_finance,
})

const mapDispatchToProps = dispatch => ({
    getList:() => {
        dispatch({
            type:'news/getList',
        })
    },
    loadMore:() => {
        dispatch({
            type:'news/loadMore',
        })
    },
    choose:(tab, index) => {
        dispatch({
            type:'news/assignTabs',
            choose_index:index
        })
        dispatch({
            type:'news/getList',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(News)

