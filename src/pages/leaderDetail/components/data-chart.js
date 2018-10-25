import CSSModules from 'react-css-modules'
import styles from '../styles/data-chart.less'
import Chart from './chart'
import {Flex} from 'antd-mobile'

const DataChart = ({data}) => (
    <div>
        <p styleName="inverp">历史交易品种</p>
        <div styleName="my_container">
            <Chart data={data}/>
        </div>
        <div>
            <ul styleName="datalist">
                {data.map((item,index) => (
                    <Flex styleName="listli" key={'data_chart_'+index}>
                        <Flex.Item styleName="listleft">
                            <span styleName="border" style={{backgroundColor:item.color}}></span>
                            <p style={{whiteSpace:'nowrap'}}>
                                {item.品种}
                                {/*<em data-v-36da99a6="">USDT</em>*/}
                            </p>
                            <span style={{color:item.color}}>{item.品种比列}%</span>
                        </Flex.Item>
                        <Flex.Item styleName="listcenter">
                            <span style={{width:item.买涨单/(item.买涨单 + item.买跌单)*100 + '%'}}></span>
                            <span style={{width:item.买跌单/(item.买涨单 + item.买跌单)*100 + '%'}}></span>
                        </Flex.Item>
                        <Flex.Item styleName="listright">
                            <p>买涨单: {item.买涨单}笔</p>
                            <p>买跌单: {item.买跌单}笔</p>
                        </Flex.Item>
                    </Flex>
                ))}
            </ul>
        </div>
    </div>
)

export default CSSModules(DataChart, styles)
