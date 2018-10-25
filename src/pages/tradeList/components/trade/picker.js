import {Component} from 'react'
import {Picker} from 'antd-mobile'
import styles from './index.less'

export default class extends Component{
    data = []
    shouldComponentUpdate(nextProps, nextState){
        if(this.data.length === 0){
            this.data = nextProps.data
            return true
        }else{
            return false
        }
    }
    render() {
        const {data} = this.props
        if(data.length === 0) return null
        return (
                <Picker
                    data={data}
                    cols={1}
                    onChange={this.props.onChange}
                >
                    <div className={styles.picker}></div>
                </Picker>
        )
    }
}
