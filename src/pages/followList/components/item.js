import CSSModules from 'react-css-modules'
import styles from '../styles/follow-list.less'
import {Flex} from 'antd-mobile'
import config from "../../../utils/config";
import React from 'react'
import person from '../../personal/images/person.png'

class Item extends React.Component {
    state = {
        src: config.server+'getuserpic?url='+this.props.item.被随头像
    }
    handleImageErrored() {
        this.setState({
            src: person
        });
    }
    render() {
        const {item,edit} = this.props;
        return (
            <Flex styleName="item" key={item.记录ID}>
                <Flex.Item styleName="img-wrap">
                    <img
                        src={this.state.src}
                        onError={this.handleImageErrored.bind(this)}
                        alt=""/>
                </Flex.Item>
                <Flex.Item styleName="info">
                    <p>{item.被随者昵称}</p>
                    <p styleName="num">{item.固定手数 === "0" ? "固定倍数" : "固定手数"}：{item.固定手数 === "0" ? item.倍数 + "倍" : item.固定手数 + "手"}</p>
                </Flex.Item>
                <Flex.Item styleName="action">
                    <p styleName="earn">{item.方向}</p>
                    <span styleName="edit" onClick={edit(item)}>编辑</span>
                </Flex.Item>
            </Flex>
        )
    }
}

export default CSSModules(Item, styles)
