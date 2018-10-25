import {connect} from 'dva'
import Empty from './empty'
import Loading from '../../../components/loading-nomore/bottom-tip'

const TotalList = ({...rest}) => (
    <div className={'trade-list-wrap'}>
        {(!rest.empty && rest.list.length ===0) ? <Loading/> : ''}
        {/*{rest.empty ? <Empty/> :""}*/}
        {rest.children}
        {(!rest.nomore && rest.list.length != 0) ? <Loading/> : ''}
    </div>
)

const mapStateToProps = state => ({
    empty:state.tradeList[state.tradeList.tabs.filter(item => item.choose)[0]['list_name']].empty,
    list:state.tradeList[state.tradeList.tabs.filter(item => item.choose)[0]['list_name']].list,
    nomore:state.tradeList[state.tradeList.tabs.filter(item => item.choose)[0]['list_name']].nomore
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(TotalList)
