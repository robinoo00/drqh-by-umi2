import CSSModules from 'react-css-modules'
import styles from '../styles/agreement.css'
import {connect} from 'dva'
import img from '../images/agreement.jpg'
import Header from '../../../components/header/header'

const Example = ({assignAgreeShow}) => {
    return (
        <div>
            <Header
                title={'协议'}
                leftCallBack={assignAgreeShow}
            />
            <img style={{width:'100%'}} src={img}/>
        </div>
    );
};

const mapStateToProps = state => ({
})

const mapDispatchToProps = (dispatch,props) => ({
    assignAgreeShow:() => {
        dispatch({
            type:'register/assignAgreeShow'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

