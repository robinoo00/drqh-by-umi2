import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import Kmap from './Kmap'
import Operation from './operation'
import Pirce from './price'
import Header from './header'
import React from 'react'
import {connect} from 'dva'
import {Toast} from 'antd-mobile'
import Detail from './detail'

let id = 0;


const Trade = () => (
    <div>
        <Header/>
        <Kmap/>
        <div id={'trade-op'} style={{position:'fixed',bottom:'8px',left:0,width:'100%'}}>
            <Detail/>
            <Operation/>
            <Pirce/>
        </div>
    </div>
)

const mapStateToProps = state => ({
    data: state.trade.data
})

const mapDispatchToProps = (dispatch, props) => ({
    getData: () => {
        dispatch({
            type: 'trade/getData'
        })
    },
    assignList: (data) => {
        dispatch({
            type: 'home/assignList',
            data: data
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Trade, styles))

