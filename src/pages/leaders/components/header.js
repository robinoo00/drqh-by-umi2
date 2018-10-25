import {connect} from 'dva'
import Header from '../../../components/header/header'
import {Picker} from 'antd-mobile'
import router from 'umi/router'
import React from 'react'

const types = [
    {
        label: '一周',
        value: '一周',
    },
    {
        label: '半月',
        value: '半月',
    },
    {
        label: '一月',
        value: '一月',
    },
];

class LeadersHeader extends React.Component{
    componentDidMount(){
        const {getPersonalInfo} = this.props;
        getPersonalInfo();
    }
    render(){
        const {...rest} = this.props;
        return(
            <Header
                title={<div>
                    <Picker
                        data={types}
                        cols={1}
                        onOk={rest.assignTypeChoose}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                        <div>
                            高手榜单<span style={{color:'#fb1'}}>({rest.type_choose})</span>
                        </div>
                    </Picker>
                </div>}
                rightText={<div onClick={() => router.push('followList')} style={{paddingTop:0}}>已跟随({rest.follow_num})</div>}
            />

        )
    }
}

const mapStateToProps = state => ({
    tabs:state.leaders.tabs,
    type_choose:state.leaders.type_choose,
    follow_num:state.personal.info.跟随人数
})

const mapDispatchToProps = dispatch => ({
    getPersonalInfo: () => {
        dispatch({
            type:'personal/getInfo'
        })
    },
    assignTypeChoose:(e) => {
        console.log('ok', e[0])
        dispatch({
            type:'leaders/assignTypeChoose',
            value:e[0]
        })
        dispatch({
            type:'leaders/getList',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(LeadersHeader)
