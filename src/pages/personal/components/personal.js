import Header from './header'
import Money from './money'
import Manager from './manager'
import Links from './links'
import React from 'react'
import {connect} from 'dva'
// import LaserBeam from 'react-laser-beam';

class Personal extends React.Component{
    componentDidMount(){
        const {getInfo} = this.props;
        getInfo();
    }
    render() {
        const {...rest} = this.props;
        return (
            <div className={'page-main'}>
                <Header info={rest.info}/>
                <Money info={rest.info}/>
                <Manager/>
                <Links/>
                {/*<LaserBeam show={this.state.test}/>*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    info:state.personal.info
})

const mapDispatchToProps = dispatch => ({
    getInfo:() => {
        dispatch({
            type:'personal/getInfo'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Personal)
