import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'

const Nav = ({...rest}) => {
    return (
        <div>
            <div styleName="fund-dialog">
                <ul>
                    {rest.nav_list.map((item,index) => (
                        <li key={'fund_nav_index'+index}>
                            <span onClick={rest.choose(index)} styleName={item.choose ? "choose" : ""}>{item.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    nav_list:state.fund.nav_list
})

const mapDispatchToProps = (dispatch, props) => ({
    show:() => {
        dispatch({
            type:'fund/toggleShow'
        })
    },
    choose:index => () => {
        dispatch({
            type:'fund/toggleShow'
        })
        dispatch({
            type:'fund/assignChoose',
            index:index
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Nav, styles))

