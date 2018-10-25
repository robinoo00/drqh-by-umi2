import CSSModules from 'react-css-modules'
import styles from '../styles/trade-list.less'
import {PullToRefresh} from 'antd-mobile'

const HistoryList = ({data}) => (
    <div styleName="trade-list">
        {/*<PullToRefresh*/}
            {/*damping={60}*/}
            {/*ref={el => this.ptr = el}*/}
            {/*style={{*/}
                {/*height: document.body.offsetHeight - 320,*/}
                {/*overflow: 'auto',*/}
            {/*}}*/}
            {/*indicator={false ? {} : { deactivate: '上拉可以刷新' }}*/}
            {/*direction={'down'}*/}
            {/*refreshing={false}*/}
            {/*onRefresh={() => {*/}
                {/*console.log(111)*/}
            {/*}}*/}
        {/*>*/}
        {data.map((item,index) => (
            <div styleName="list-hold" key={"trade_list_"+index}>
                <div styleName="left">
                    <p>
                        <span styleName="name">{item.Symbol} <em>{item.Currency}</em></span>
                        <span styleName="trade-type" style={{backgroundColor:item.OpenBuySell === "买入" ? "#00cf8c" : "#ff6056"}}>{item.OpenBuySell === "买入" ? "买" : "卖"}</span>
                        <em styleName="hands"> x  {item.Qty}手</em>
                    </p>
                    <p styleName="mtop">
                        <span styleName="open">开仓价  {item.OpenPrice}</span>
                        <span styleName="ask">{item.OpenDate.slice(0,10)}</span>
                    </p>
                    <p styleName="mtop">
                        <span styleName="open">平仓价  {item.ClosePrice}</span>
                        <span styleName="ask">{item.CloseDate.slice(0,10)}</span>
                    </p>
                </div>
                <div styleName="right" style={{color:(item.ClosePrice - item.OpenPrice).toFixed(2) < 0 ? "#00cf8c" : "#ff6056"}}>
                    {(item.ClosePrice - item.OpenPrice).toFixed(2)}
                </div>
            </div>
        ))}
        {/*</PullToRefresh>*/}
    </div>
)

export default CSSModules(HistoryList,styles)
