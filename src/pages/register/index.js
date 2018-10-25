import Register from './components/register'
import AgreeMent from './components/agreement'
import {connect} from 'dva'

const RegisterPage = ({agree_show}) => (
    <div>
        {!agree_show ? <Register/> : ''}
        {agree_show ? <AgreeMent/> : ''}
    </div>
)

const mapStateToProps = state => ({
    agree_show:state.register.agree_show
})

const mapDispatchToProps = (dispatch,props) => ({
    assignAgreeShow:() => {
        dispatch({
            type:'register/assignAgreeShow'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage)
