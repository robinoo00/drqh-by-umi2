import Header from '../../components/header/header'
import router from 'umi/router'
import {WhiteSpace} from 'antd-mobile'
import {connect} from 'dva'


const Introduce = ({con}) => (
    <div>
        <Header
            title={sessionStorage.getItem('guide_title')}
            leftCallBak={() => {router.goBack()}}
        />
        <WhiteSpace size={"lg"}/>
        <div style={{padding:'0 .15rem'}} dangerouslySetInnerHTML={{
            __html: con
        }}/>
    </div>
)

const mapStateToProps = state => ({
    con:state.introduce.con
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(Introduce)
