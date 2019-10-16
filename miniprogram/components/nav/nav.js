// components/nav/nav.js

const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pagesLen: { //navbarData   由父页面传递的数据，变量名字自命名
            type: Boolean,
            value: {},
            observer: function (newVal, oldVal) { }
        }
    },



    /**
     * 组件的初始数据F
     */
    data: {
        height: app.globalData.height,
        heightdiv: app.globalData.height,
        paddingTop: app.globalData.paddingTop,
        pagesLength: app.globalData.pagesLength,
        heightList: 0,
        opacity: 0,
        bottom: 200,
        animationData: {},
        display:"none"
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeName() {
            this.triggerEvent('change', {
                bottom: this.data.bottom
            })
        },
        page() {
            if (getCurrentPages().length > 1) {
                this.setData({
                    pagesLength: true
                })
            } else {
                this.setData({
                    pagesLength: false
                })
            }
        },
        navList() {
            if (!this.data.opacity) {
                this.setData({
                    heightList: this.data.height,
                    opacity: 1,
                    heightdiv: this.data.heightdiv + 120,
                    bottom: 0,
                    display:"block"
                })
                this.changeName()
                this.animation.translate(0, this.data.height).opacity(1).step({ duration: 1000 })
                this.setData({
                    animationData: this.animation.export()
                })
            } else {
                this.setData({
                    heightList: 0,
                    opacity: 0,
                    heightdiv: this.data.heightdiv - 120,
                    bottom: 200
                })
                this.changeName()
                
                this.animationHidden()
            }
        },

        animationHidden(){
            
            this.animation.translate(0, -this.data.height).opacity(0).step({ duration: 1000 })
            this.setData({
                animationData: this.animation.export()
            })
        },
        indexOpen() {
            wx.switchTab({
                url: "./../../pages/index/index",
                success: () => {
                    this.setData({
                        heightList: 0,
                        heightdiv: this.data.heightdiv - 120,
                        opacity: 0
                    })
                }
            })
            this.changeName()

            this.animationHidden()
        },
        collectOpen() {
            wx.switchTab({
                url: "./../../pages/collectSuc/collectSuc",
                success: () => {
                    this.setData({
                        heightList: 0,
                        heightdiv: this.data.heightdiv - 120,
                        opacity: 0
                    })
                }
            })
            this.changeName()
            
            this.animationHidden()
        },
        userOpen() {
            wx.switchTab({
                url: "./../../pages/user/user",
                success: () => {
                    this.setData({
                        heightList: 0,
                        heightdiv: this.data.heightdiv - 120,
                        opacity: 0
                    })
                }
            })
            this.changeName()
            
            this.animationHidden()
        },
        mores() {
            wx.showToast({
                title: "拼命中构思中···",
                mask: true,
                icon: "none",
                success: () => {
                    this.setData({
                        heightList: 0,
                        heightdiv: this.data.heightdiv - 120,
                        opacity: 0
                    })
                }
            })
            this.changeName()
            
            this.animationHidden()
        },
    },
    attached: function () {
        this.page()
        this.changeName()
        var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
        })

        this.animation = animation

        animation.scale(1, 1).rotate(0).translate(0,-this.data.height).step()

        this.setData({
            animationData: animation.export()
        })

        setTimeout(function () {
            animation.translate(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 600)
        this.animationHidden()
    },
})