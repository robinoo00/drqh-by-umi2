import {Button} from 'antd-mobile'

const MyButton  = ({title,bgColor='#5B78C0',callBack=() => {}}) => (
    <Button type={'primary'}
            style={{backgroundColor: bgColor, lineHeight: '.44rem', height: '.44rem'}}
            onClick={callBack}
    >{title}</Button>
)

export default MyButton
