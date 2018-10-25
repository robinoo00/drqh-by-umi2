import Header from '../../../components/header/header'
import {Component} from 'react'
import ag1 from '../images/1客户须知.jpg'
import ag2 from '../images/2担保合作协议.jpg'
import ag3 from '../images/3风险提示书.jpg'
import ag4 from '../images/4投资顾问书.jpg'
import ag5 from '../images/5客户确认书.jpg'
import {Picker} from 'antd-mobile'
import styles  from '../styles/index.less'

class Agreement extends Component{
    state = {
        list:[
            {label:'客户须知',value:'客户须知',src:ag1},
            {label:'担保合作协议',value:'担保合作协议',src:ag2},
            {label:'风险提示书',value:'风险提示书',src:ag3},
            {label:'投资顾问书',value:'投资顾问书',src:ag4},
            {label:'客户确认书',value:'客户确认书',src:ag5},
        ],
        chooseLabel:'客户须知',
        src:ag1,
        showPicker:false,
    }
    choose(val){
        const list = this.state.list;
        const item = list.filter(item => item.value === val)[0];
        this.setState({
            chooseLabel:item.label,
            src:item.src,
            showPicker:false
        })
    }
    render(){
        return(
            <div>
                <Header
                    title={<Picker
                        onChange={(val) => {
                            this.choose(val[0]);
                        }}
                        data={this.state.list} cols={1}>
                        <div onClick={() => {
                            this.setState({
                                showPicker:true,
                            })
                        }} className={this.state.showPicker ? styles['header-down'] : styles['header-up']}>{this.state.chooseLabel}</div>
                    </Picker>}
                />
                <img style={{width:'100%'}} src={this.state.src} alt=""/>
            </div>
        )
    }
}

export default Agreement
