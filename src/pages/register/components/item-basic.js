import CSSModules from 'react-css-modules'
import styles from '../styles/form.css'
import {Flex} from 'antd-mobile'

const Item = ({data,getFieldProps}) => (
    <Flex styleName="mod-form">
        <Flex.Item styleName="td1">{data.title}</Flex.Item>
        <Flex.Item>
            <input {...getFieldProps(data.name, {
                initialValue: '',
                rules: [{
                    required: true, message: '请输入' + data.title,
                }],
            })} type="text" styleName="inp" style={{lineHeight:'18px'}} placeholder={'请输入' + data.title}/>
        </Flex.Item>
    </Flex>
)


export default CSSModules(Item,styles)
