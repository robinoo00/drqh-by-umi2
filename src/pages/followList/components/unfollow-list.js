import CSSModules from 'react-css-modules'
import styles from '../styles/follow-list.less'
import {connect} from 'dva'
import {Flex} from 'antd-mobile'
import router from 'umi/router'

const List = () => (
    <div>
        <Flex styleName="item">
            <Flex.Item styleName="img-wrap">
                <img src="https://digitalsh.oss-cn-shanghai.aliyuncs.com/ueditor/1523418178796001891.png?x-oss-process=image/auto-orient,1" alt=""/>
            </Flex.Item>
            <Flex.Item styleName="info">
                <p>啊啊啊啊</p>
            </Flex.Item>
            <Flex.Item styleName="action">
                <p styleName="earn">0</p>
                <span styleName="edit" onClick={() => router.push('followEdit')}>跟随</span>
            </Flex.Item>
        </Flex>
    </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(List,styles))
