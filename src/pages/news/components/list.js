import CSSModules from 'react-css-modules'
import styles from '../styles/news.less'
import React from 'react'
import {ListView} from 'antd-mobile'
import {connect} from 'dva'
import Loading from '../../../components/loading-nomore/bottom-tip'

class NewsList extends React.Component {
    renderRow(row) {
        return (
            <li>
                <div className={styles.timeline}>
                    <div className={styles.dotbg}>
                        <div className={styles.dot}></div>
                    </div>
                    <div className={styles.time}>{row.时间}</div>
                </div>
                <div className={styles.onlytxt}>
                    <div>
                        <div dangerouslySetInnerHTML={{
                            __html: row.内容
                        }}></div>
                    </div>
                </div>
            </li>
        )
    }

    render() {
        const hei = document.body.offsetHeight - 93;
        const {list,loadMore} = this.props;
        return (
            <div styleName="mod-news-wrap">
                <div styleName="timecon">
                    <ul styleName="livecon">
                        <ListView
                            dataSource={list.data}
                            renderRow={this.renderRow}
                            onEndReached={loadMore}
                            onEndReachedThreshold={50}
                            onScroll={() => {
                                console.log('scroll');
                            }}
                            scrollRenderAheadDistance={500}
                            renderFooter={() => <Loading nomore={list.nomore}/>}
                            // showsVerticalScrollIndicator={false}
                            style={{
                                height: hei + 'px',
                                overflow: 'auto',
                            }}
                        />
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    loadMore:() => {
        console.log('loadmore');
        dispatch({
            type:'news/loadMore',
        })
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(NewsList, styles))
