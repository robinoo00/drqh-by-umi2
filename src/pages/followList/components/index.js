import Header from '../../../components/header/header'
import {Tabs,Badge} from 'antd-mobile'
import FollowList from './follow-list'
// import UnFollowList from './unfollow-list'
import {connect} from 'dva'
import React from 'react'
import Link from 'umi/link'

class Index extends React.Component{
    componentDidMount(){
        const {getList} = this.props;
        getList();
    }
    render(){
        const {...rest} = this.props;
        return(
            <div className={"page-main"}>
                <Header
                    title={'我是跟随者'}
                />
                <FollowList/>
                {/*<Tabs*/}
                    {/*tabs={rest.tabs}*/}
                    {/*renderTab={(tab) => (<Badge text={tab.num}>{tab.title}</Badge>)}*/}
                    {/*swipeable={false}*/}
                    {/*tabBarBackgroundColor={'#262834'}*/}
                    {/*initialPage={rest.tabs.indexOf(rest.tabs.filter(item => item.choose)[0])}*/}
                    {/*onChange={(tab, index) => {*/}
                        {/*// console.log('onChange', index, tab);*/}
                    {/*}}*/}
                    {/*onTabClick={rest.choose}*/}
                {/*>*/}
                    {/*<FollowList/>*/}
                    {/*<UnFollowList/>*/}
                {/*</Tabs>*/}
                <p style={{textAlign:'center',padding:'.1rem 0'}}>
                    <Link to="leaders" style={{textDecoration:'underline',color:'#108ee9'}}>看看高手榜单></Link>
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tabs:state.followList.tabs
})

const mapDispatchToProps = dispatch => ({
    getList:() => {
      dispatch({
          type:'followList/getList'
      })
    },
    choose:() => {

    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Index)
