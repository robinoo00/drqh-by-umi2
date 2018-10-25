import DataItem from './data-item'
import DataChart from './data-chart'
import styles from '../styles/total-data.less'

const TotalData = ({data}) => (
    <div className={styles["data-wrap"]}>
        <DataItem data={data}/>
        <DataChart data={data.品种统计}/>
    </div>
)

export default TotalData
