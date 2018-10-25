import Button from '../../../components/button/button'
import styles from '../styles/footer.less'
import {connect} from 'dva'
import React from 'react'

class Footer extends React.Component{
    render(){
        const {data,showLimitEarn} = this.props;
        return(
            <div style={{height:'75px'}}>
                <div className={styles["footer-wrap"]}>
                    <Button
                        title={ `添加`}
                        callBack={showLimitEarn}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data:state.limits.tempdata,
    list:state.limits.list,
    tempdata:state.limits.tempdata
})

const mapDispatchToProps = dispatch => ({
    showLimitEarn:() => {
        dispatch({
            type:'limits/assignInputsValue',
        })
        dispatch({
            type:'limits/showLimitEarnAdd'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Footer)
