// pages/collectSuc/collectSuc.js
const app = getApp()

const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: [],
        height:app.globalData.height,
        i:1,
        width:"0",
        listNan:false,
        padd:"",
        collect:false,
    },

    
    swiperchange: function (e) {
        this.setData({
            i:e.detail.current+1
        })
    },
    // 初始化数据 
    collectLook: function (i = 0) {
        db.collection('collect').where({
            openid: app.globalData.openid
        })
        .get({
            success: (res) => {
                console.log(res.data.length)
                if(res.data.length==0){
                    this.setData({
                        listNan:true
                    })
                }else{
                    this.setData({
                        listNan:false
                    })
                }
                this.setData({
                    content:res.data
                })
            }
        })
    },

    // 列表
    list:function(){
        if(this.data.width=="0"){
            this.setData({
                width:"20vw",
                padd:"20rpx"
            })
        }else{
            this.setData({
                width:"0",
                padd:""
            })
        }
    },
    listLi:function (e){
        let tab = e.currentTarget.dataset.index+1
        if (this.data.i-1 === e.currentTarget.dataset.index) {
            // return false
        }else{
            this.setData({
                i: tab
            })
        }
    },

    // 取消收藏
    collectFunc:function(){
        db.collection('collect').where({
            openid:app.globalData.openid
        })
        .get({
            success: (res) => {
                for(let i = 0;i<res.data.length; i++){
                    if(this.data.content[this.data.i-1].ID==res.data[i].ID){
                        db.collection('collect').doc(res.data[i]._id).update({
                            data: {
                                openid:this.remov(res.data[i].openid,app.globalData.openid) 
                            }
                        })
                        .then(() =>{
                            console.log(1),
                            this.collectLook()
                            if(this.data.i>=this.data.content.length){
                                if(this.data.i==1){
                                    return false
                                }
                                this.setData({
                                    i:this.data.i-1
                                })
                            }
                        })
                        .catch(console.error)
                    }
                }
                
            }
        })
    },

    /**
     * 
     * @param {数组} array 
     * @param {被删除的项} val 
     */
    remov:function(array,val){
        let index = array.indexOf(val)
        array.splice(index,1)
        return array
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.collectLook()
        console.log(app.globalData.openid)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})