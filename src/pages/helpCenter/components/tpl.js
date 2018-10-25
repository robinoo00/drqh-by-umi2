import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import config from "../../../utils/config";
import icon from '../images/icon-tel.png'
import React from 'react'
import {Accordion} from 'antd-mobile'
import Link from 'umi/link'

class Example extends React.Component{
    componentDidMount(){
        const {getList} = this.props;
        getList();
    }
    render(){
        const {list} = this.props;
        return(
            <div>
                <Header
                    title={'提问'}
                    // rightText={<a href={"tel:"+config.SERVICE_TEL}><img alt={""} style={{width:'.2rem'}} src={icon}/></a>}
                />
                <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                    {list.map(item => (
                        <Accordion.Panel header={item.内容} key={item.id}>
                            <div className={styles.con_wrap}>
                                <div className={styles.con}>{item.回复}</div>
                                <div className={styles.time}>{item.时间}</div>
                            </div>
                        </Accordion.Panel>
                    ))}
                </Accordion>
                <div className={styles.wrap}>
                    <Link to="/helpAsk">我要留言</Link>
                </div>
            </div>
        )
    }
}

// const Example = () => {
//     return (
//         <div>
//             <Header
//                 title={'提问'}
//                 rightText={<a href={"tel:"+config.SERVICE_TEL}><img alt={""} style={{width:'.2rem'}} src={icon}/></a>}
//             />
//             <div className={styles.wrap}>
//                 <a href="#/helpAsk">我要留言</a>
//             </div>
//         </div>
//     );
// };

const mapStateToProps = state => ({
    list:state.helpCenter.list
})

const mapDispatchToProps = (dispatch,props) => ({
    getList:() => {
        dispatch({
            type:'helpCenter/getList'
        })
    },
    loadMore:() => {
        dispatch({
            type:'helpCenter/loadMore'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

