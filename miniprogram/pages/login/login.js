// miniprogram/pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        setTimeout(() => {
            wx.switchTab({
                url: './../index/index'
            })
        },1000)
    },

})