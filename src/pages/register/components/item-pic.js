import CSSModules from 'react-css-modules'
import styles from '../styles/form.css'
import tp1 from '../images/tp1.png'
import {connect} from 'dva'
import {Flex} from 'antd-mobile'
import {dataURLtoFile} from '@/utils/common'
import lrz from 'lrz'

const Item = ({list,assignPic}) => (
    <Flex styleName="mod-form" style={{justifyContent:'space-around'}}>
        {list.map((item,index) => (
            <Flex.Item key={'register_pic_'+item.name} styleName="file-wrap">
                <input type="file" styleName="file-inp" onChange={assignPic(index)}/>
                <div styleName="td2">
                    <img src={item.src}/>
                    <div styleName="td2tr">{item.title}</div>
                </div>
            </Flex.Item>
        ))}
    </Flex>
)

const mapStateToProps = state => ({
    list:state.register.tp_list
})

const mapDispatchToProps = (dispatch,props) => ({
    assignPic:index => (e) => {
        const file = e.target.files[0];
        if(file.size > 1024 * 1024){
            lrz(file,{
                quality: 0.7,
                width: 1024,
            }).then(rst => {
                dispatch({
                    type:'register/assignTp1',
                    file:dataURLtoFile(rst.base64),
                    index:index,
                    src:window.URL.createObjectURL(file)
                })
            })
        }else{
            dispatch({
                type:'register/assignTp1',
                file:file,
                index:index,
                src:window.URL.createObjectURL(file)
            })
        }
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Item, styles))
