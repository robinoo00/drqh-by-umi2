import React from 'react'
import {Modal, List, Button,InputItem,Toast} from 'antd-mobile'
import {connect} from 'dva'
import {createForm} from 'rc-form'
import router from 'umi/router'

class LimitEarn extends React.Component{
    componentWillUnmount(){
        const {hide} = this.props;
        hide();
    }
    render(){
        const {data,visible,inputs,hide,form,submit} = this.props;
        return(
            <Modal
                popup
                visible={visible}
                onClose={hide}
                animationType="slide-up"
            >
                <List renderHeader={() => <div>
                    止损止盈({data.合约})
                    <span style={{float:'right'}} onClick={() => {
                        router.push({pathname:'limits',query:{code:data.合约}})
                    }}>记录</span>
                </div>} className="popup-list">
                    {inputs.map((i, index) => (
                            <InputItem
                                {...form.getFieldProps(i.name,{
                                    // rules: [{
                                    //     required: true, message: i.placeholder,
                                    // }],
                                })}
                                key={index}
                                clear
                                placeholder={i.placeholder}
                            >{i.text}</InputItem>
                    ))}
                    <List.Item>
                        <Button inline style={{width:'47%',height:'40px',lineHeight:'40px'}} onClick={hide}>取消</Button>
                        <Button inline type="primary"style={{width:'47%',float:'right',height:'40px',lineHeight:'40px'}} onClick={submit}>设置</Button>
                    </List.Item>
                </List>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    data:state.tradeList.limit_earn.data,
    visible:state.tradeList.limit_earn.visible,
    inputs:state.tradeList.limit_earn.inputs
})

const mapDispatchToProps = (dispatch,props) => ({
    submit: () => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                console.log(value);
                dispatch({
                    ...value,
                    type:'tradeList/limitEarn',
                })
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    },
    hide: () => {
        dispatch({
            type:'tradeList/hideLimitEarn'
        })
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(LimitEarn))

