// pages/index1/index1.js
// import nav from "" 

let time = null, srcArray = null;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        width: null,
        opacity: 0,
        top: null,
        left: null,
        index: 1,
        src: srcArray,
        i: false
    },

    /**
     * 生命周期函数--监听页面加载
     */

    setTime: function () {
        clearInterval(time)
        let shift = "";
        time = setInterval(() => {
            shift = this.data.src.shift()
            this.data.src.push(shift)
            this.setData({
                src:this.data.src
            })
        }, 2000);
    },
    aaa: function () {
        clearInterval(time)
        console.log(this.data.src)
    },
    onLoad: function (options) {
        const db = wx.cloud.database()
        db.collection('lunbo')
            .get()
            .then(res => {
                // console.log(res.data)
                srcArray = res.data
                this.setData({
                    src: res.data,
                    i: Math.floor(res.data.length / 2 ? res.data.length / 2 : res.data.length / 2 + 1)
                })
            })
            .catch(err => {
                console.error(err)
            })
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
        this.setTime()
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