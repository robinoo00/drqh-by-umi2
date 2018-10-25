import Header from '../../../components/header/header'
import Item from './item'
import {connect} from 'dva'
import React from 'react'
import router from 'umi/router'

class Banks extends React.Component{
    componentDidMount(){
        const {getUserInfo} = this.props;
        getUserInfo();
    }
    render(){
        return(
            <div>
                <Header
                    title={'我的银行卡'}
                    rightText={'替换银行卡'}
                    url={'personal'}
                    rightCallBack={() => {
                        router.push({pathname:'bankEdit'})
                    }}
                />
                <Item/>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    getUserInfo:() => {
        dispatch({
            type:'personal/getInfo'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Banks)
