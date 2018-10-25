import CSSModules from 'react-css-modules'
import styles from '../styles/data-item.less'

const DataItem = ({data}) => (
    <div styleName="data-top">
        <p styleName="data-title">数据统计</p>
        <ul styleName="data-con">
            <li>
                <p styleName="data-num">{data.亏损率}</p>
                <p styleName="data-txt">亏损率</p>
            </li>
            <li>
                <p styleName="data-num">{data.交易笔数}</p>
                <p styleName="data-txt">交易笔数</p>
            </li>
            <li>
                <p styleName="data-num">{data.卖出盈利笔数}</p>
                <p styleName="data-txt">盈利笔数</p>
            </li>
            <li>
                <p styleName="data-num">{data.平均亏损}</p>
                <p styleName="data-txt">平均亏损</p>
            </li>
            <li>
                <p styleName="data-num">{data.平均盈利}</p>
                <p styleName="data-txt">平均盈利</p>
            </li>
            <li>
                <p styleName="data-num">{data.总交易手数}</p>
                <p styleName="data-txt">交易手数</p>
            </li>
            <li>
                <p styleName="data-num">{data.总收益}</p>
                <p styleName="data-txt">总收益</p>
            </li>
            <li>
                <p styleName="data-num">{data.最近交易}</p>
                <p styleName="data-txt">最近交易</p>
            </li>
            <li>
                <p styleName="data-num">{data.盈利率}</p>
                <p styleName="data-txt">盈利率</p>
            </li>
            <li>
                <p styleName="data-num">{data.累计亏损}</p>
                <p styleName="data-txt">累计亏损</p>
            </li>
            <li>
                <p styleName="data-num">{data.赢亏比列}</p>
                <p styleName="data-txt">赢亏比列</p>
            </li>
            <li>
                <p styleName="data-num">{data.跟随人数}</p>
                <p styleName="data-txt">跟随人数</p>
            </li>
        </ul>
    </div>
)

export default CSSModules(DataItem,styles)
