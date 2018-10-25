import CSSModules from 'react-css-modules'
import styles from '../styles/list.less'
import React from 'react'
import {connect} from 'dva'
import {removeScrollListener, scrollLoadMore} from "../../../utils/common";
import config from '../../../utils/config'
import router from 'umi/router'

class List extends React.Component {
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
        const {list,link} = this.props;
        return (
            <ul styleName="dataList">
                {list.map(item => (
                    <li key={"knowledge_"+item.id} onClick={link(item.标题,item.内容)}>
                        <div styleName="showmain">
                            <img src={config.server+"getuserpic1?url="+item.说明图片} alt="" styleName="backimg"/>
                            <p styleName="mtitle">{item.标题}</p>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    list: state.knowledge.list
})

const mapDispatchToProps = (dispatch, props) => ({
    link:(title,con) => () => {
        sessionStorage.setItem(config.NEW_TITLE,title);
        sessionStorage.setItem(config.NEW_CON,con);
        router.push('newsDetail')
    },
    getList: () => {
        dispatch({
            type: 'knowledge/getList'
        })
    },
    loadMore: () => {
        dispatch({
            type: 'knowledge/loadMore'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(List, styles))
