import CSSModules from 'react-css-modules'
import styles from '../styles/market.less'
// import {TitleLine} from "./common";
import router from 'umi/router'
import {connect} from 'dva'
import {Flex} from 'antd-mobile'
import Loading from '../../../components/loading-nomore/bottom-tip'

const Market = ({...rest}) => (
    <div styleName="market-wrap">
        {/*<TitleLine text={'行情'} arrow={false}/>*/}
        <Flex styleName="td">
            <Flex.Item>交易品种</Flex.Item>
            <Flex.Item>价格</Flex.Item>
            <Flex.Item>涨跌幅</Flex.Item>
        </Flex>
        <div styleName="list">
            {rest.list.length === 0 ? <Loading/> : ''}
            {rest.list.map(item => (
                <Flex key={item.合约} styleName="item" onClick={() => router.push({
                    pathname:'/trade',query:{code:item.合约}
                })}>
                    <Flex.Item styleName="info">
                        <p styleName="name">
                            <span>{item.名称}&nbsp;</span>
                            {/*<span>/{item.合约}</span>*/}
                        </p>
                        <p style={{color: '#bfbfbf'}}>{item.合约}</p>
                    </Flex.Item>
                    <Flex.Item styleName="money">
                        <p>{item.最新价}</p>
                        <p>现量:{item.现量}</p>
                    </Flex.Item>
                    <Flex.Item styleName="show">
                        <span styleName="btn" style={(item.最新价 === 0 || item.收盘价 === 0 || (item.最新价 - item.收盘价)/item.收盘价 * 100 < 0) ? {backgroundColor:'#01B28E'} : {}}>
                            {(item.最新价 === 0 || item.收盘价 === 0) ? '0%' : ((item.最新价 - item.收盘价)/item.收盘价 * 100).toFixed(2) + '%'}
                        </span>
                    </Flex.Item>
                </Flex>
            ))}
        </div>
    </div>
)

const mapStateToProps = state => ({
    list: state.home.list
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Market, styles))
