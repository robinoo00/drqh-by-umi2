export default {
    AliPayUrl:'https://qr.alipay.com/fkx03968ggaqsbcqzyttme5',
    server:'http://47.101.154.35:1007/api/',
    UN_SHOW_LOADING_URLS:['getinfo','gettpsllist','holding','order','holdingcoms','login','register','chujin'],//单独设置的加载回调接口（其它的都会使用通用加载动画）
    KEY:'key',
    CID:'cid',
    K_DATA_LIST:'k_data_list',//首页列表session数据
    ACCOUNT:'account',
    PASSWORD:'password',
    SERVICE_TEL:'400-88888888',
    TRADE_SWITCH:'trade_switch',//交易是否确认
    PWD_CASH:'pwd_cash',//是否记住密码
    TRADE_CODE:'trade_code',//合约session 交易页价格显示用
    NEW_TITLE:'new_title',//新闻标题 详细页显示用 读取session
    NEW_CON:'new_con',//新闻内容 详细页显示用 读取session
    NEWS_PROD:'prod',//新闻详细页类型 产品相关介绍 从服务端获取
    NEWS_SECRET:'secret',//新闻详细页类型 免责及隐私声明 从服务端获取
    FOLLOW_EDIT:'follow_edit',//跟随者缓存信息
    FOLLOW_TYPE_ADD:'follow_add',//跟随操作
    FOLLOW_TYPE_EDIT:'follow_edit',//编辑操作
    HasFooterPages:['/tradeList','/personal','/home','/','/leaders'],//有底部tab的页面
    NoAutoLogin:['/register','/login','/agreement'],//不需要自动登录的页面
    NoTokenPages:['/','/register','/login','/test','/agreement']//不需要授权就可登录的页面
}
