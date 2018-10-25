import {Tabs, Badge} from 'antd-mobile'
import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import {removeScrollListener, scrollLoadMore,getScrollPos} from "../../../utils/common";
import React from 'react'
let id;

class TradeListTabs extends React.Component{
    componentDidMount(){
        let {loadMore,getList,tabs,getPositionList} = this.props;
        const choose_tab = tabs.filter(item => item.choose)[0];
        const index = tabs.indexOf(choose_tab);
        if(index === 0){
            id = setInterval(getPositionList,1000);
        }
        getList();
        scrollLoadMore(() => {
            loadMore()
        })
        window.addEventListener('scroll', () => {
            const scrollPos = getScrollPos()
            const el = document.getElementsByClassName('am-tabs-tab-bar-wrap')[0]
            if(scrollPos >= 340){
                el.classList.add("trade-list-tabs");
                // el.style.position = 'fixed';
                // el.style.top = 0;
                // el.style.width = '100%';
                // el.style.zIndex = 100
            }else{
                el.classList.remove("trade-list-tabs");
            }
        })
    }
    componentWillUnmount(){
        removeScrollListener();
        clearInterval(id);
    }
    render(){
        const {tabs,choose,children} = this.props;
        return(
            <div className="tradelist-tab-wrap">
                <Tabs
                    tabs={tabs}
                    swipeable={false}
                    tabBarBackgroundColor={'#262834'}
                    initialPage={tabs.indexOf(tabs.filter(item => item.choose)[0])}
                    onChange={(tab, index) => {
                        // console.log('onChange', index, tab);
                    }}
                    onTabClick={choose}
                    id='tedt123'
                >
                    {children}
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tabs:state.tradeList.tabs
})

const mapDispatchToProps = (dispatch, props) => ({
    getList:() => {
        dispatch({
            type:'tradeList/getList',
        });
    },
    getPositionList:() => {
        dispatch({
            type:'tradeList/getPositionList',
        });
    },
    choose: (tab, index) => {
        dispatch({
            type:'tradeList/assignTabs',
            choose_index:index
        });
        dispatch({
            type:'tradeList/getList',
        });
        if(index === 0){
            id = setInterval(() => {
                dispatch({
                    type:'tradeList/getPositionList',
                });
            },1000)
        }else{
            clearInterval(id);
        }
    },
    loadMore:() => {
        console.log('more')
        dispatch({
            type:'tradeList/LoadMore'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(TradeListTabs, styles))
