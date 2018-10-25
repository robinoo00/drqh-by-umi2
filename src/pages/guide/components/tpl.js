import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {List,WhiteSpace} from 'antd-mobile'
import router from 'umi/router'
import {removeScrollListener, scrollLoadMore} from "../../../utils/common";
import React from 'react'
const Item = List.Item

class Help extends React.Component{
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
        const {...rest}  = this.props;
        return(
            <div>
                <Header
                    title={'风险提示'}
                    leftCallBack={() => {router.goBack()}}
                />
                <WhiteSpace size={"md"}/>
                <List
                    // renderHeader={'注册问题'}
                >
                    {rest.list.map(item => (
                        <Item
                            key={item.id}
                            arrow={'horizontal'}
                            onClick={
                                () => {
                                    sessionStorage.setItem('guide_title',item.标题)
                                    sessionStorage.setItem('guide_content',item.内容)
                                    router.push({pathname:'/introduce',query:item.id})
                                }
                            }
                        >
                            <span style={{fontSize:'14px'}}>{item.标题}</span>
                        </Item>
                    ))}
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list:state.guide.list
})

const mapDispatchToProps = (dispatch,props) => ({
    getList:() => {
        dispatch({
            type:'guide/getList'
        })
    },
    loadMore:() => {
        dispatch({
            type:'discover/loadMore'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Help, styles))

