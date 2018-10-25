import CSSModules from 'react-css-modules'
import styles from '../styles/detail.less'
import config from '../../../utils/config'
import Header from '../../../components/header/header'
import {connect} from 'dva'
import React from 'react'

class Detail extends React.Component{
    componentDidMount(){
        const {getDetail} = this.props;
        getDetail();
    }
    render(){
        const {...rest} = this.props;
        return(
            <div>
                <Header
                    title={rest.header_title}
                />
                {rest.inner_title ? <div>
                    <div styleName="ourtitle">{sessionStorage.getItem(config.NEW_TITLE)}</div>
                    <p styleName="tip"></p>
                </div> : ''}
                <div styleName="mainmsg">
                    <div dangerouslySetInnerHTML={{
                        __html: rest.con
                    }}></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    header_title:state.newsDetail.header_title,
    inner_title:state.newsDetail.inner_title,
    con:state.newsDetail.con
})

const mapDispatchToProps = dispatch => ({
    getDetail:() => {
        dispatch({
            type:'newsDetail/getDetail'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Detail,styles))
