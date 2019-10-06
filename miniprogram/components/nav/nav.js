// components/nav/nav.js

const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        nav: { //navbarData   由父页面传递的数据，变量名字自命名
            type: Object,
            value: {},
            observer: function (newVal, oldVal) { }
        }
    },

    /**
     * 组件的初始数据F
     */
    data: {
        height: null,
        //默认值  默认显示左上角
        navbarData: {
            showCapsule: 1
        },
        paddingTop: null
    },

    ready: function () {
        let Rect = wx.getMenuButtonBoundingClientRect();
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    height: res.statusBarHeight+Rect.height+16 + "px",
                    paddingTop: res.statusBarHeight + "px"
                })
            }
        })
    },
    /**
     * 组件的方法列表
     */
    attached: function () {
        // 获取是否是通过分享进入的小程序
        // this.setData({
        //     share: app.globalData.share
        // })
        // 定义导航栏的高度   方便对齐
        // this.setData({
        //     height: app.globalData.height
        // })
    },
    methods: {
        // 返回上一页面
        fanhui() {
            wx.navigateBack()
        },
        //返回到首页
        _backhome() {
            wx.switchTab({
                url: '/pages/index/index',
            })
        }
    }
})