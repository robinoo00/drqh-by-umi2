import CSSModules from 'react-css-modules'
import styles from '../styles/rule.css'
import {connect} from 'dva'
import React from 'react'

class Example extends React.Component {
    render() {
        return (
            <div styleName="wrap">
                <div styleName="pt20">
                    <table>
                        <tbody>
                        <tr>
                            <td width="30%;">结算货币</td>
                            <td width="70%">美元</td>
                        </tr>
                        <tr>
                            <td>上市交易所</td>
                            <td>纽约商业交易所（NYMEX）</td>
                        </tr>
                        <tr>
                            <td>中文名称</td>
                            <td>纽银</td>
                        </tr>
                        <tr>
                            <td>英文名称</td>
                            <td>Comex Silver</td>
                        </tr>
                        <tr>
                            <td>品种代码</td>
                            <td style={{color: 'red'}}>Si</td>
                        </tr>
                        <tr>
                            <td>报价单位</td>
                            <td>美元/盎司</td>
                        </tr>
                        <tr>
                            <td>最小变动价位</td>
                            <td>0.005</td>
                        </tr>
                        <tr>
                            <td>交易单位</td>
                            <td>5000盎司</td>
                        </tr>
                        <tr>
                            <td>最小变动值</td>
                            <td>25美元</td>
                        </tr>
                        <tr>
                            <td>盘内保证金</td>
                            <td>6500美金</td>
                        </tr>
                        <tr>
                            <td>交易时间</td>
                            <td>
                                06：00-05：00（夏）<br/>
                                07:00-06:00（冬）
                            </td>
                        </tr>
                        <tr>
                            <td>限制日内交易强平时间</td>
                            <td style={{backgroundColor: '#ffff00', color: '#ff3e00'}}>凌晨05:45(冬)<br/>凌晨04:45(夏)</td>
                        </tr>
                        {/*<tr>*/}
                        {/*<td>交易手续费(单边)</td>*/}
                        {/*<td>30美元</td>*/}
                        {/*</tr>*/}
                        <tr>
                            <td>结算约定汇率</td>
                            <td>1：7.2</td>
                        </tr>
                        <tr>
                            <td>最低授信交易保证金</td>
                            <td>10000CNY</td>
                        </tr>
                        <tr>
                            <td>最大授信比例</td>
                            <td>1:10</td>
                        </tr>
                        <tr>
                            <td>强制平仓比例</td>
                            <td>不低于代偿保证金的30%（数据行情或重大事件不低于40%）</td>
                        </tr>
                        <tr>
                            <td>止盈、止损</td>
                            <td>无点位限制(在每日价格最大波动限制内)</td>
                        </tr>
                        <tr>
                            <td>最大持仓限制</td>
                            <td>无限制，合约归属结算币种授信累计最大100手(单边持仓限100手)</td>
                        </tr>
                        <tr>
                            <td>支持银行</td>
                            <td>中行、农行、工行、建行、邮政、光大、民生、招商等</td>
                        </tr>
                        <tr style={{color: 'red'}}>
                            <td>出入金时间</td>
                            <td>
                                入金：24小时<br/>
                               <section style={{color: '#ff3e00'}}>                                    出金:工作日9:00--17:00 <br/>                                    （一天限出金3次）<br/>单笔最高5万                                </section>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Example, styles))

