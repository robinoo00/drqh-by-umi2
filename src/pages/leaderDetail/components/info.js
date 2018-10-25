import CSSModules from 'react-css-modules'
import styles from '../styles/info.less'
import config from '../../../utils/config'
import {Flex} from 'antd-mobile'

const Header = ({data}) => (
    <div styleName="info-wrap">
        <div styleName="info-con">
            <div styleName="info-per">
                <img src={config.server+'getuserpic?url='+data.头像} alt="" styleName="header-pic"/>
                <p styleName="info-name">
                    {data.昵称}
                </p>
            </div>
            <Flex styleName="info-static">
                <Flex.Item>
                    <p styleName="header-num">
                        {data.总收益}
                    </p>
                    <p styleName="header-txt">
                        总收益
                    </p>
                </Flex.Item>
                <Flex.Item>
                    <p styleName="header-num">
                        {data.盈利率}
                    </p>
                    <p styleName="header-txt">
                        盈利率
                    </p>
                </Flex.Item>
                <Flex.Item>
                    <p styleName="header-num">
                        {data.跟随人数}
                    </p>
                    <p styleName="header-txt">
                        跟随人数
                    </p>
                </Flex.Item>
            </Flex>
        </div>
    </div>
)

export default CSSModules(Header,styles)
