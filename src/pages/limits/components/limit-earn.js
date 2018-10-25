import React from 'react'
import {Modal, List, Button,InputItem,Toast} from 'antd-mobile'
import {connect} from 'dva'
import {createForm} from 'rc-form'

let id = 0;

class LimitEarn extends React.Component{
    render(){
        const {code,visible,inputs,hide,form,submit,data} = this.props;
        return(
            <Modal
                popup
                visible={visible}
                onClose={hide}
                animationType="slide-up"
            >
                <List renderHeader={() => <div>
                    止损止盈({code} × {data.qty}手)
                </div>} className="popup-list">
                    {inputs.map((i, index) => (
                            <InputItem
                                {...form.getFieldProps(i.name,{
                                    initialValue:i.value
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
    code:state.limits.code,
    visible:state.limits.limit_earn.visible,
    inputs:state.limits.limit_earn.inputs,
    data:state.limits.limit_earn.data
})

const mapDispatchToProps = (dispatch,props) => ({
    submit: () => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                dispatch({
                    ...value,
                    type:'limits/modify',
                })
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    },
    hide: () => {
        dispatch({
            type:'limits/hideLimitEarn'
        })
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(LimitEarn))

