import {ActivityIndicator} from 'antd-mobile'
import styles from './style.less'

const BottomTip = ({nomore = false}) => (
    <div>
        {!nomore ? <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}><ActivityIndicator color={"#fff"} text="正在加载..." /></div> :
            <div className={styles.nomore}>没有更多了</div>
        }
    </div>
)

export default BottomTip
