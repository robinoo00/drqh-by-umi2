import {Picker} from 'antd-mobile'
import {Component} from 'react'
const test = [
    {label:'test',value:'test'},
    {label:'222',value:'222'}
]
class Test extends Component{
    render(){
        return(
            <Picker
                onChange={(val) => {
                    console.log(val);
                }}
                data={test} cols={1}>
                <div>123</div>
            </Picker>
        )
    }
}

export default Test
