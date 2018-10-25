import {Icon} from 'antd-mobile'
const Item = () => (
    <div className="am-toast am-toast-mask"><span><div className="am-toast-notice am-toast-notice-closable"><div
        className="am-toast-notice-content"><div className="am-toast-text am-toast-text-icon" role="alert"
                                                 aria-live="assertive"><svg
        className="am-icon am-icon-loading am-icon-lg"><Icon type={'loading'}/></svg><div
        className="am-toast-text-info">加载中</div></div></div><a className="am-toast-notice-close"><span
        className="am-toast-notice-close-x"></span></a></div></span></div>
)

export default Item
