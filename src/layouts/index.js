import React from 'react';
import withRouter from 'umi/withRouter';
import Footer from './footer'
import {Toast} from 'antd-mobile'
import {connect} from 'dva'
import config from "../utils/config";

class Layout extends React.Component{
    componentWillMount() {//首页列表所需数据
        const {assignList,autoLogin,location} = this.props;
        const {NoAutoLogin} = config;
        if(!NoAutoLogin.includes(location.pathname)){
            autoLogin();
        }
        window.work.client.GetFSData = function (data) {
            // console.log(JSON.parse(data))
            assignList(JSON.parse(data))
            sessionStorage.setItem(config.K_DATA_LIST, data);
        };
    }
    componentDidMount(){//接受绘制K线所需数据
        const {assignKData,type_choose} = this.props;
        if(!window.k_type_choose){
            window.k_type_choose = type_choose;
        }
        window.work.client.kdata = function (data) {
            const get_data = eval("(" + data + ")");
            if(get_data.length != 0){
                let get_type = get_data[0]['类型'];
                if(window.k_type_choose === '分时' || window.k_type_choose === '1分钟'){
                    assignKData(get_data);
                }else{
                    switch(get_type){
                        case '2':
                            get_type = '5分钟';
                            break;
                        case '3':
                            get_type = '15分钟';
                            break;
                        case '4':
                            get_type = '1小时';
                            break;
                        case '5':
                            get_type = '1日';
                            break;
                    }
                    if(get_type == window.k_type_choose){
                        assignKData(get_data);
                    }
                }
            }else{
                assignKData([]);
            }
        };
    }
    render(){
        const {children,location} = this.props;
        const pathname = location.pathname;
        const { HasFooterPages } = config;
        return (
            <div>
                <div>
                    {children}
                </div>
                {HasFooterPages && HasFooterPages.includes(pathname) ? <Footer/> : ''}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    type_choose:state.k.type_choose
})

const mapDispatchToProps = dispatch =>({
    //自动登录
    autoLogin:() => {
      dispatch({
          type:'login/autoLogin'
      })
    },
    //赋值K线数据
    assignKData: (data) => {
        dispatch({
            type: 'k/assignData',
            data: data
        })
    },
    //赋值首页列表数据
    assignList: (data) => {
        dispatch({
            type: 'home/assignList',
            data: data
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Layout))
