import CSSModules from 'react-css-modules'
import styles from '../styles/trade-list.less'
import {PullToRefresh} from 'antd-mobile'
import {connect} from 'dva'

const CurrentTrade = ({data}) => (
    <div styleName="trade-list">
        {data.length === 0 ? <p style={{textAlign:'center'}}>当前暂无交易</p> : ''}
        {data.map((item,index) => (
            <div styleName="list-hold" key={"trade_list_"+index}>
                <div styleName="left">
                    <p>
                        <span styleName="name">{item.合约} <em>{item.货币}</em></span>
                        <span styleName="trade-type" style={{backgroundColor:item.方向 === "买入" ? "#00cf8c" : "#ff6056"}}>{item.方向 === "买入" ? "买" : "卖"}</span>
                        <em styleName="hands"> x  {item.数量}手</em>
                    </p>
                    <p styleName="mtop">
                        <span styleName="open">平仓盈亏：{item.平仓盈亏}</span>
                    </p>
                    <p styleName="mtop">
                        <span styleName="open">开仓时间：{item.开仓时间}</span>
                    </p>
                </div>
                <div styleName="right" style={{color:item.浮动盈亏 > 0 ? "#00cf8c" : "#ff6056"}}>
                    {item.浮动盈亏}
                </div>
            </div>
        ))}
    </div>
)

const mapStateToProps = state => ({
    data:state.leaderDetail.current
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(CurrentTrade,styles))
