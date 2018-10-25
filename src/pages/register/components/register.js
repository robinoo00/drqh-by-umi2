import CSSModules from 'react-css-modules'
import styles from '../styles/register.css'
import Header from '../../../components/header/header'
import Form from './form'
import router from 'umi/router'

const Register = ({...rest}) => {
    return (
        <div>
            <Header
                title={'注册'}
                leftCallBack={() => {router.push('/login')}}
            />
            <Form/>
        </div>
    );
};

export default CSSModules(Register, styles)

