import { MailOutlined } from '@ant-design/icons';


const menuList = [
    {
        label:'首页',
        key:'/home',
        icon:<MailOutlined/>
    },
    {
        label:'UI',
        key:'/ui',
        children:[

            {
                label:'按钮',
                key:'/ui/buttons',
            },
            {
                label:'弹框',
                key:'/ui/modals',
            },
            {
                label:'Loading',
                key:'/ui/loadings',
            },
            {
                label:'通知提醒',
                key:'/ui/notification',
            },
            {
                label:'全局Message',
                key:'/ui/messages',
            },
            {
                label:'Tab页签',
                key:'/ui/tabs',
            },
            {
                label:'图片画廊',
                key:'/ui/gallery',
            },
            {
                label:'轮播图',
                key:'/ui/carousel',
            }
        ]
    },
    {
        label:'表单',
        key:'/form',
        children:[
            {
                label:'登录',
                key:'/form/login',
            },
            {
                label:'注册',
                key:'/form/reg',
            }
        ]
    },
    {
        label:'表格',
        key:'/table',
        children:[
            {
                label:'基础表格',
                key:'/table/basic',
            },
            {
                label:'高级表格',
                key:'/table/high',
            }
        ]
    },
    {
        label:'富文本',
        key:'/rich'
    },
    {
        label:'城市管理',
        key:'/city'
    },
    {
        label:'订单管理',
        key:'/order',
        // children:[
        //     {
        //         label:'订单详情',
        //         key:'detail'
        //     },
        //     {
        //         label:'结束订单',
        //         key:'finish'
        //     }
        // ]
    },
    {
        label:'员工管理',
        key:'/user'
    },
    {
        label:'车辆地图',
        key:'/bikeMap'
    },
    {
        label:'图标',
        key:'/charts',
        children:[
            {
                label:'柱形图',
                key:'/charts/bar'
            },
            {
                label:'饼图',
                key:'/charts/pie'
            },
            {
                label:'折线图',
                key:'/charts/line'
            },
        ]
    },
    {
        label:'权限设置',
        key:'/permission'
    },
];
export default menuList;