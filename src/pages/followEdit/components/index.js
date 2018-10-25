import Header from '../../../components/header/header'
import CSSModules from 'react-css-modules'
import styles from '../styles/edit.less'
import {Button, Toast, Modal} from 'antd-mobile'
import {connect} from 'dva'
import Ways from './ways'
import Direct from './direct'
import Nums from './nums'
import {Flex} from 'antd-mobile'
import React from 'react'
import router from 'umi/router'

class Edit extends React.Component{
    componentWillUnmount(){
        const {init} = this.props;
        init();
    }
    render(){
        const {...rest} = this.props;
        return(
            <div>
                <Header
                    title={'编辑跟随'}
                    rightText={rest.edit ? <span onClick={rest.remove(rest.nickname)}>取消跟随</span> : ''}
                />
                <div styleName="tip" onClick={() =>{
                    router.push('leadersAgreeMent')
                }}>
                    选择跟随之前请仔细阅读<span styleName="agreement">《跟随协议》</span>
                </div>
                <div styleName="action">
                    <Flex styleName="line">
                        <Flex.Item styleName="left">
                            跟随对象
                        </Flex.Item>
                        <Flex.Item>
                            {rest.nickname}
                        </Flex.Item>
                    </Flex>
                    <Ways/>
                    <Direct/>
                    <Nums/>
                    <Button styleName="submit" onClick={rest.submit}>确定</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    way: state.followEdit.way,
    nickname: state.followEdit.nickname,
    edit: state.followEdit.edit,
})

const mapDispatchToProps = dispatch => ({
    init:() => {
      dispatch({
          type:'followEdit/init'
      })
    },
    submit: () => {
        Toast.loading('操作中', 0)
        dispatch({
            type: 'followEdit/follow'
        })
    },
    remove: nickname => () => {
        Modal.alert('取消跟随?', '确定取消跟随"' + nickname + '"吗？', [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '确定', onPress: () => {
                    Toast.loading('操作中', 0)
                    dispatch({
                        type: 'followEdit/removeFollow'
                    })
                }
            }
        ])

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Edit, styles))
