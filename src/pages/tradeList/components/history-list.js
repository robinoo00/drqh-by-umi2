import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import {WhiteSpace,List} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;

const HistoryList = ({...rest}) => (
    <div>
        <WhiteSpace size={"md"}/>
        {rest.list.map((item,index) => (
            <div key={"history_list_"+index}>
                <Item
                    extra={
                        <div>
                            <p className={item['方向'] === "买入" ? "down-color" : "up-color"}>{item['方向']}{item['数量']}手</p>
                            <Brief>￥{item['价格']}</Brief>
                        </div>}
                >
                    <p style={{fontSize:'.17rem'}}>{item['合约']} <span style={{fontSize:'.14rem'}}>（手续费:{item['手续费']}）</span></p>
                    <Brief style={{fontSize:'.1rem'}}>{item['时间']}</Brief>
                </Item>
                <WhiteSpace size={"sm"}/>
            </div>
        ))}
    </div>
)

const mapStateToProps = state => ({
    list:state.tradeList.history_list.list,
})

const mapDispatchToProps = (dispatch,props) => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(HistoryList, styles))

