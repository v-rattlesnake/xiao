// pages/share/share.js
        
const db = wx.cloud.database()
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:"",
        height:app.globalData.height
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showShareMenu({
            withShareTicket: true
        })
        db.collection('collect').where({
            ID:options.ID
        }).get()
        .then(res => {
            this.setData({
                content:res.data[0].content
            })
        })
        if (options.scene == 1044) {
            wx.getShareInfo({
                shareTicket: options.shareTicket,
                success: function(res){
                    //console.log('分享后打开数据',res);
                    var encryptedData = res.encryptedData;
                    var iv = res.iv;
                }
            })
        }
    },

})