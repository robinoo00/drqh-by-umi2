import React from 'react'
import Draw from './draw'
import {connect} from 'dva'
import CSSModules from 'react-css-modules'
import styles from '../styles/k.css'
import config from "../../../utils/config";
import {Flex} from 'antd-mobile'
import {getKData} from '../services/'

const draw = new Draw();

class K extends React.Component {
    state = {
        type_list:['分时','1分钟','5分钟','15分钟','1小时','1日'],
        type_choose:'分时',
        reload:false
    }
    code = sessionStorage.getItem(config.TRADE_CODE)
    sid = 0
    lastTime = ''
    type_choose = '分时'
    componentDidMount() {
        // console.log(this.state)
        // console.log(this.type_choose)
        setTimeout(() => {
            const h = document.body.offsetHeight - document.getElementById('trade-op').offsetHeight - 80 - 10
            draw.画布id = "k";
            draw.宽 = window.screen.width;
            // draw.高 = window.screen.height - 327;
            draw.高 = h;
            draw.上边距 = 40;
            draw.距顶距离 = 160;
            draw.定时 = 300;
            draw.init();
            draw.loading();
            draw.reload();
            draw.eve();
        })
        setTimeout(() => {
            this._getData()
            this.sid = setInterval(this._getData,1000)
            // this.sid = setTimeout(this._getData)
        })
        // this._getData()
        // this.sid = setInterval(this._getData,1000)
    }
    _getData = () => {
        // console.log(this.type_choose,this.lastTime)
        const params = {
            contract: this.code,
            type:this.type_choose,
            time:this.lastTime
        }
        getKData(params).then(({data}) => {
            if(data){
                // console.log(data)
                if(this.state.reload && data.length < 4){
                    return
                }else{
                    this.setState({
                        reload:false
                    })
                    let time = ''
                    // if(data.length === 0){
                    //     console.log('error')
                    //     console.log(this.state.type_choose)
                    //     console.log(this.lastTime)
                    //     clearInterval(this.sid)
                    //     return
                    // }
                    if(data.length === 1){
                        time = data[0]['结束时间']
                    }
                    if(data.length != 0 && data.length != 1){
                        time = data[data.length - 1]['结束时间']
                    }
                    this.lastTime = time
                    // console.log('draw_code',this.code)
                    // console.log('draw_data',data)
                    // console.log(data)
                    // console.log(time)
                    this.draw(data)
                }
            }
        })
    }
    componentWillUnmount(){
        draw.reload();
        draw.loading();
        clearInterval(this.sid)
    }
    draw(data) {
        const len = data.length;
        if (len != 0) {
            draw.代码 = sessionStorage.getItem(config.TRADE_CODE);
            draw.类型 = this.state.type_choose;
            draw.getdata(data);
        }
    }

    chooseType = type => () => {
        draw.reload();
        this.lastTime = ''
        this.type_choose = type
        // console.log('choose',type)
        // console.log(this.type_choose,this.lastTime)
        if (this.state.type_choose != type) {
            draw.loading();
            this.setState({
                type_choose:type,
                reload:true
            })
            this._getData(type)
        }
    }

    render() {
        const {type_list,type_choose} = this.state;
        return (
            <div>
                <Flex styleName="k-nav">
                    {type_list.map((item,index) => (
                        <Flex.Item style={type_choose === item ? {borderBottom:'1px solid #fff'} : {}} styleName={"k-nav-item"} key={'k_nav_'+index} onClick={this.chooseType(item).bind(this)}>{item}</Flex.Item>
                    ))}
                </Flex>
                <canvas id="k" style={{zoom: 0.5, backgroundColor: "#20212b"}}></canvas>
            </div>
        )
    }
}


export default CSSModules(K,styles)
