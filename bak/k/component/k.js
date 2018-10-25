import React from 'react'
import Draw from './draw'
import {connect} from 'dva'
import CSSModules from 'react-css-modules'
import styles from '../styles/k.css'
import config from "../../../utils/config";
import {Flex} from 'antd-mobile'
import {chooseKType} from '../../../utils/common'

const draw = new Draw();

class K extends React.Component {
    componentDidMount() {
        const data = this.getChooseData();
        const _this = this;
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
            draw.eve();
            chooseKType(sessionStorage.getItem(config.TRADE_CODE), "分时");
            // if(data.length === 0){
            //     console.log(111);
            //     // console.log('send');
            //     chooseKType(sessionStorage.getItem(config.TRADE_CODE), "分时");
            // }else{
            //     _this.draw(data);
            // }
        })
    }
    componentWillReceiveProps(nextProps){
        const {draw_data} = nextProps;
        const old_draw_data = this.props.draw_data;
        // console.log('draw_data',draw_data);
        // console.log('old_draw_data',old_draw_data);
        // console.log('time',new Date().valueOf());
        // console.log('draw_data',draw_data);
        // const neq = draw_data.toString() != old_draw_data.toString();
        if(draw_data.length != 0){
            // if(old_draw_data.length != 0 && draw_data[0]['合约'] != old_draw_data[0]['合约']){
            //     console.log('un');
            //     draw.loading();
            // }
            // setTimeout(() => {
            //     this.draw(draw_data);
            // })
            this.draw(draw_data);
        }else{
            draw.loading();
        }
    }
    componentWillUnmount(){
        const {init} = this.props;
        window.k_type_choose = '分时';
        draw.loading();
        init();
    }
    draw(data) {
        const {type_choose} = this.props;
        const len = data.length;
        if (len != 0) {
            draw.代码 = sessionStorage.getItem(config.TRADE_CODE);
            draw.类型 = type_choose;
            draw.getdata(data);
        }
    }

    getChooseData(type = ''){
        const {type_list} = this.props;
        if(type === '') type = this.props.type_choose;
        const index = type_list.indexOf(type);
        const {...rest} = this.props;
        let data = [];
        switch (index) {
            case 0:
                data = rest.data_0;
                break;
            case 1:
                data = rest.data_1;
                break;
            case 2:
                data = rest.data_2;
                break;
            case 3:
                data = rest.data_3;
                break;
            case 4:
                data = rest.data_4;
                break;
            case 5:
                data = rest.data_5;
                break;
        }
        if(data.length === 0){
            return []
        }else{
            return data;
        }
    }

    chooseType = type => () => {
        draw.reload();
        const {...rest} = this.props;
        if (rest.type_choose != type) {
            draw.loading();
            window.k_type_choose = type;
            rest.assignTypeChoose(type);
            const data = this.getChooseData(type);
            // console.log('choose_type',type);
            // console.log('choose_data',data);
            if (data.length != 0) {
                setTimeout(() => {
                    this.draw(data);
                })
            } else {
                window.work.server.k线(sessionStorage.getItem(config.TRADE_CODE), type, "");
            }
        }
    }

    render() {
        const {type_list,type_choose} = this.props;
        return (
            <div>
                <Flex styleName="k-nav">
                    {type_list.map((item,index) => (
                        <Flex.Item style={type_choose === item ? {borderBottom:'1px solid #fff'} : {}} styleName={"k-nav-item"} key={'k_nav_'+index} onClick={this.chooseType(item).bind(this)}>{item}</Flex.Item>
                    ))}
                </Flex>
                {/*<nav styleName="k-nav">*/}
                    {/*{type_list.map((item,index) => (*/}
                        {/*<div style={type_choose === item ? {borderBottom:'1px solid #fff'} : {}} styleName={"k-nav-item"} key={'k_nav_'+index} onClick={this.chooseType(item).bind(this)}>{item}</div>*/}
                    {/*))}*/}
                {/*</nav>*/}
                <canvas id="k" style={{zoom: 0.5, backgroundColor: "#20212b"}}></canvas>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data_0: state.k.data_0,
    data_1: state.k.data_1,
    data_2: state.k.data_2,
    data_3: state.k.data_3,
    data_4: state.k.data_4,
    data_5: state.k.data_5,
    draw_data: state.k.draw_data,
    type_choose: state.k.type_choose,
    type_list: state.k.type_list,
})

const mapDispatchToProps = dispatch => ({
    init: (data) => {
        dispatch({
            type: 'k/init',
        })
    },
    assignData: (data) => {
        dispatch({
            type: 'k/assignData',
            data: data
        })
    },
    assignTypeChoose: (type) => {
        dispatch({
            type: 'k/assignTypeChoose',
            value: type
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(K,styles))
