import CSSModules from 'react-css-modules'
import styles from './style.less'
import {Flex} from 'antd-mobile'

const Comp = ({delCallBack,addCallBack,inputCallBack,value}) => (
    <Flex styleName="num-choose">
        <Flex.Item styleName="item">
            <div styleName="del-item" onClick={delCallBack}>-</div>
        </Flex.Item>
        <Flex.Item styleName="item">
            <div styleName="num-input">
                <input type="number" onChange={inputCallBack} value={value}/>
            </div>
        </Flex.Item>
        <Flex.Item styleName="item">
            <div styleName="add-item" onClick={addCallBack}>+</div>
        </Flex.Item>
    </Flex>
)

export default CSSModules(Comp,styles)
