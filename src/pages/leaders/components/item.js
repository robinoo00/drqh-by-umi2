import CSSModules from 'react-css-modules'
import styles from '../styles/item.less'
import router from 'umi/router'
import config from '../../../utils/config'
import {Flex} from 'antd-mobile'
import person from '../../personal/images/person.png'
import React from 'react'

class Item extends React.Component{
    state = {
        src: config.server+'getuserpic?url='+this.props.item.头像
    }
    handleImageErrored() {
        this.setState({
            src: person
        });
    }
    render(){
        const {item} = this.props;
        return(
            <div styleName="earnings-list-wrap" onClick={() => {router.push({pathname:'leaderDetail',query:{id:item.ID}})}}>
                <div styleName="portrait-wrap">
                    <img styleName="portrait" src={this.state.src} alt="" onError={this.handleImageErrored.bind(this)}/>
                    <p>{item.昵称}</p>
                </div>
                <Flex styleName="earnings-list-con">
                    <Flex.Item>
                        <p styleName="earnings-num"  className={item.总收益 > 0 ? "up-color" : "down-color"}>
                            {parseInt(item.总收益)}
                        </p>
                        <p styleName="earnings-list-txt">
                            总收益
                        </p>
                    </Flex.Item>
                    <Flex.Item>
                        <p styleName="earnings-num" className={item.盈利率 > 0 ? "up-color" : "down-color"}>
                            {item.盈利率}%
                        </p>
                        <p styleName="earnings-list-txt">
                            胜率
                        </p>
                    </Flex.Item>
                    <Flex.Item>
                        <p styleName="earnings-num" className={item.赢亏比列 > 0 ? "up-color" : "down-color"}>
                            {item.跟随人数}
                        </p>
                        <p styleName="earnings-list-txt">
                            跟随人数
                        </p>
                    </Flex.Item>
                    {item.是否被跟随 === "false" ? <Flex.Item style={{marginTop:0}} onClick={(e) => {e.stopPropagation();router.push({pathname:'followEdit',query:{id:item.ID,nickname:item.昵称,from:config.FOLLOW_TYPE_ADD}})}}>
                        <span styleName="follow-btn">跟随</span>
                    </Flex.Item> : <Flex.Item style={{marginTop:0}} onClick={(e) => {e.stopPropagation();router.push({pathname:'followEdit',query:{fid:item.跟随id,nickname:item.昵称,from:config.FOLLOW_TYPE_EDIT}})}}>
                        <span styleName="follow-btn" style={{color:'#fb1',borderColor:'#fb1'}}>编辑</span>
                    </Flex.Item>}
                </Flex>
            </div>
        )
    }
}

export default CSSModules(Item,styles)
