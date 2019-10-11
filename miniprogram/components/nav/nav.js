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
        height: app.globalData.height,
        paddingTop: app.globalData.paddingTop
    }

    /**
     * 组件的方法列表
     */
    // methods: {
    // }
})