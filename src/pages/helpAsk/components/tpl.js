import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import config from "../../../utils/config";
import icon from '../images/icon-tel.png'
import Button from '../../../components/button/button'
import {ImagePicker} from 'antd-mobile'

const Example = ({...rest}) => {
    return (
        <div>
            <Header
                title={'提问'}
                // rightText={<a href={"tel:" + config.SERVICE_TEL}><img alt={""} style={{width: '.2rem'}} src={icon}/></a>}
            />
            <div className={styles.mod_help_ask}>
                <select className={styles.sel} onChange={rest.chooseType}>
                    <option value="0">请选择留言类型</option>
                    {rest.type_list.map((item, index) => (
                        <option value={item} key={'hel_ask_' + index}>{item}</option>
                    ))}
                </select>
                <textarea onChange={rest.inputContent} placeholder={'请写下你宝贵的意见，我们客服将及时解答您的题！'}
                          className={styles.text}></textarea>
                <ImagePicker
                    files={rest.files}
                    onChange={rest.assignFiles}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    multiple={false}
                    selectable={rest.files.length <1}
                />
                <Button
                    title={'提交'}
                    callBack={rest.ask}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    type_list: state.helpAsk.type_list,
    type: state.helpAsk.type,
    content: state.helpAsk.content,
    files: state.helpAsk.files
})

const mapDispatchToProps = (dispatch, props) => ({
    assignFiles: (files, type, index) => {
        dispatch({
            type: 'helpAsk/assignFiles',
            files: files
        })
    },
    chooseType: (e) => {
        dispatch({
            type: 'helpAsk/assignType',
            value: e.target.value
        })
    },
    inputContent: (e) => {
        dispatch({
            type: 'helpAsk/assignContent',
            content: e.target.value
        })
    },
    ask: () => {
        dispatch({
            type: 'helpAsk/ask',
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Example, styles))

