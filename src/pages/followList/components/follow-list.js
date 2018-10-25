import CSSModules from 'react-css-modules'
import styles from '../styles/follow-list.less'
import {connect} from 'dva'
import router from 'umi/router'
import config from "../../../utils/config";
import React from 'react'
import Item from './item'

const List = ({...rest}) => (
    <div>
        {rest.list.map(item => (
            <Item
                item={item}
                edit={rest.edit}
            />
        ))}
    </div>
)

const mapStateToProps = state => ({
    list: state.followList.follow_list
})

const mapDispatchToProps = dispatch => ({
    edit: item => () => {
        sessionStorage.setItem(config.FOLLOW_EDIT, JSON.stringify(item));
        router.push({
            pathname: 'followEdit',
            query: {fid: item.记录ID, nickname: item.被随者昵称, from: config.FOLLOW_TYPE_EDIT}
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(List, styles))
