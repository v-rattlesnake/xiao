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
        bottom:200,
        heightdiv:0
    },

    
    swiperchange: function (e) {
        this.setData({
            i:e.detail.current+1
        })
    },


    
    // nav组件传递的值
    changeName(event) {
        this.setData({
            bottom:event.detail.bottom,
        })
        if(event.detail.bottom){
            this.setData({
                heightdiv:0
            })
        }else{
            this.setData({
                heightdiv:240
            })
        }
    },
    // 初始化数据 
    async collectLook (i = 0) {
        let _op = app.globalData.openid
        await db.collection('collect').where({
            "openid._op": app.globalData.openid
        })
        .get({
            success: (res) => {
                if(res.data.length==0){
                    this.setData({
                        listNan:true
                    })
                }else{
                    let titleArr = []
                    for(let i =0;i<res.data.length;i++){
                        titleArr.push(res.data[i].openid[this.ind(res.data[i].openid,app.globalData.openid)].title)
                    }
                    this.setData({
                        listNan:false,
                        titleArr
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
    async collectFunc (){
        let _op = app.globalData.openid
        await db.collection('collect').where({
            "openid._op":app.globalData.openid
        }).get()
        .then(res => {
            for(let i = 0;i<res.data.length; i++){
                if(this.data.content[this.data.i-1].ID==res.data[i].ID){
                    db.collection('collect').doc(res.data[i]._id).update({
                        data: {
                            openid:this.remov(res.data[i].openid,app.globalData.openid) 
                        }
                    })
                    .then(() =>{
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
        })
    },

    /**
     * 
     * @param {数组} array 
     * @param {被删除的项} val 
     */
    remov: function (array,val) {
        array.splice(this.ind(array,val), 1)
        return array
    },
    ind(array,val){
        for(let i = 0 ; i<array.length;i++){
            if(array[i]._op == val){
                return i
            }
        }
    },

    
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.hideLoading()
    },


    /**
     * 生命周期函数--监听页面显示
     */

    onShow: function () {
        this.collectLook()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let id = this.data.content[this.data.i-1].ID||this.data.content[this.data.i-1].hashId
        return {
            title: "笑话集锦",
            path: '/pages/share/share?ID='+id,
            success(e) {
                // shareAppMessage: ok,
                // shareTickets 数组，每一项是一个 shareTicket ，对应一个转发对象
                // 需要在页面onLoad()事件中实现接口
                //console.log('分享成功');
                wx.showShareMenu({
                    // 要求小程序返回分享目标信息
                    withShareTicket: true
                });

                var shareTickets = e.shareTickets;
                //console.log('shareTickets',shareTickets);
                if (shareTickets.length == 0) {
                    return false;
                }
                wx.getShareInfo({
                    shareTicket: shareTickets[0],
                    success: function(res){
                        //console.log('立即分享获得信息',res);
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;
                    }
                })


            },
            fail(e) {
                //console.log('分享失败');
                // shareAppMessage:fail cancel
                // shareAppMessage:fail(detail message)
            },
            complete(){
                //console.log(0)
            }
        }
    }
})