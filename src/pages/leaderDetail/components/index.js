import Header from '../../../components/header/header'
import {connect} from 'dva'
import Info from './info'
import {Tabs} from 'antd-mobile'
import styles from '../styles/index.less'
import TotalData from './total-data'
import TradeList from './trade-list'
import Loading from '../../../components/loading-antd/index'
import CurrentTrade from './current-trade'
import router from 'umi/router'
import config from "../../../utils/config";

const Index = ({...rest}) => (
    <div>
        <Header
            title={rest.data.昵称}
        />
        {rest.data.length === 0 ? <Loading/> : <div>
            <Info data={rest.data}/>
            <div className={styles["page-wrap"]}>
                <Tabs
                    tabs={rest.tabs}
                    // renderTab={(tabs) => <Nav tab={tabs}/>}
                    initialPage={0}
                    swipeable={false}
                    tabBarBackgroundColor={'#262834'}
                    onChange={(tab, index) => {
                        // console.log('onChange', index, tab);
                    }}
                    onTabClick={rest.choose}
                >
                    <TotalData data={rest.data}/>
                    <CurrentTrade/>
                    <TradeList data={rest.data.平仓记录}/>
                </Tabs>
            </div>
        </div>}
        {rest.data.是否被跟随 === "true" ? <div className={styles["follow-wrap"]}>
            <div className={styles["follow-btn"]} onClick={() => {router.push({pathname:'followEdit',query:{fid:rest.data.跟随id,nickname:rest.data.昵称,from:config.FOLLOW_TYPE_EDIT}})}}>编辑跟随</div>
        </div> : <div className={styles["follow-wrap"]}>
            <div className={styles["follow-btn"]} onClick={() => {router.push({pathname:'followEdit',query:{id:rest.id,nickname:rest.data.昵称,from:config.FOLLOW_TYPE_ADD}})}}>跟随高手</div>
        </div>}

    </div>
)

const mapStateToProps = state => ({
    data:state.leaderDetail.data,
    tabs:state.leaderDetail.tabs,
    id:state.leaderDetail.id
})

const mapDispatchToProps = dispatch => ({
    choose:(tab,index) => {
        if(index === 1){
            dispatch({
                type:'leaderDetail/getCurrentTrade'
            })
        }
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Index)
