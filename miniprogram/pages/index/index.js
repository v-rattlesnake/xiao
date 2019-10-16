// pages/index1/index1.js
// import nav from "" 

const app = getApp()
const db = wx.cloud.database()
let shuijiI = "", hottest = ""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: app.globalData.height,
        content: [],
        content1: [],
        collect: true,
        lookUp: "",
        openid: "",
        tab: true,
        bottom: 200,
        t:app.globalData.tan,
        title:"",
        titleHidden:"none",
        i:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async bbb () {
        wx.request({
            url: app.globalData.url + "/randJoke.php",
            data: {
                key: "988b56b817df13431fd954d1db05df25",
                page: 2
            },
            success: (res) => {
                this.setData({
                    content:res.data.result,
                    content1:res.data.result
                })
            }
        })
    },

    // nav组件传递的值
    changeName(event) {
        this.setData({
            bottom: event.detail.bottom
        })
    },

    // 提示
    login(){
        try {
            wx.setStorageSync('tang', true)
        } catch (e) { }
        this.setData({
            t:false
        })
    },
    // 左右滑动
    async swiperchange(e) {
        this.setData({
            i: e.detail.current + 1
        })
        this.collectLook(this.data.i - 1)
        this.collectLookUp(this.data.i - 1)
    },

    // 随机
    suiji: function () {
        hottest = this.data.i
        this.setData({
            content: this.data.content1,
            tab: true,
            i: shuijiI
        })
        this.collectLook(this.data.i - 1)
    },
    // 最热
    hottest: function () {
        shuijiI = this.data.i
        db.collection("collect").get()
            .then((res) => {
                let resContent = []
                let resData = res.data
                for (let i = 0; i < resData.length; i++) {
                    for (let j = i + 1; j < resData.length; j++) {
                        if (resData[i].openid.length < resData[j].openid.length) {
                            [resData[i], resData[j]] = [resData[j], resData[i]]
                        }
                    }
                }
                return resData
            })
            .then(res => {
                this.setData({
                    content: res,
                    tab: false,
                    i: hottest || 1
                })
                this.collectLook(this.data.i - 1)
            })
    },

    // 收藏、取消收藏
    async collectFunc() {
        if (this.data.collect) {//第一次被收藏
            this.setData({
                titleHidden:"block"
            })
        } else { //取消收藏
            this.setData({
                collect: true
            })
            await db.collection('collect').where({
                "openid._op": app.globalData.openid
            }).get()
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        if (this.data.content[this.data.i - 1].hashId == res.data[i].ID) {
                            let openidUp = this.remov(res.data[i].openid, app.globalData.openid)
                            db.collection('collect').doc(res.data[i]._id).update({
                                data: {
                                    "openid": openidUp
                                }
                            })
                            return
                        }
                    }
                })
        }

    },

    //查看是否被当前用户收藏
    async collectLook(i = 0) {
        await db.collection('collect').where({
            ID: this.data.content[i].hashId || this.data.content[i].ID,
            "openid._op": app.globalData.openid
        })
            .get({
                success: (res) => {
                    if (res.data.length >= 1) {
                        this.setData({
                            collect: false,
                        })
                    } else {
                        this.setData({
                            collect: true
                        })
                    }
                }
            })
    },
    //查看是否被收藏过
    async collectLookUp(i = 0) {
        await db.collection('collect').where({
            ID: this.data.content[i].hashId,
        })
            .get({
                success: (res) => {
                    if (res.data.length >= 1) {
                        this.setData({
                            lookUp: true,
                        })
                    } else {
                        this.setData({
                            lookUp: false
                        })
                    }
                }
            })
    },

    onGetOpenid() {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                app.globalData.openid = res.result.openid
                this.setData({
                    openid: res.result.openid
                })
                this.collectLook()
                this.collectLookUp()
                
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
            }
        })
    },


    // 下拉刷新
    onRefresh: function () {
        this.setData({
            alreadyLoadData: false,
            pageIndex: 1,
            pageCount: 1,
        })
        this.loadData()
            .then(res => {
                this.setData({
                    alreadyLoadData: true
                })
            })
            .catch(error => {
                this.setData({
                    alreadyLoadData: true
                })
            })
    },
    loadMore () {
        console.log(111)
        let { pageIndex, pageCount } = this.data
        if (pageIndex > pageCount || this.posting) return
        this.posting = true
        this.loadData(true)
            .then(res => {
                this.posting = false
            })
    },
    async loadData (){
        await this.bbb()
    },


    // 获取收藏标题
    val(e){
        this.setData({
            aaa:e.detail.value
        })
    },

    // 有标题
    async btn(e){
        if(e.target.dataset.index == 0){
            this.setData({
                titleHidden:"none"
            },this.a())
        }else{
            this.setData({
                title:this.data.aaa,
                titleHidden:"none"
            }, this.a())
        }
        
    },

    async a(){
        let _op = app.globalData.openid
        this.setData({
            collect: false,
        })
        if (this.data.lookUp) {//被收藏过
            await db.collection('collect').where({
                ID: this.data.content[this.data.i - 1].ID || this.data.content[this.data.i - 1].hashId ,
            }).get()
                .then(res => {
                    let openidArr = res.data[0].openid
                    openidArr.push({"_op":this.data.openid,"title":this.data.title})
                    db.collection('collect').doc(res.data[0]._id).update({
                        data: {
                            openid: openidArr
                        }
                    })
                    this.collectLook()
                })
            return
        }
        this.setData({
            lookUp: true,
        })
        await db.collection('collect').add({
            // data 字段表示需新增的 JSON 数据
            data: {
                content: this.data.content[this.data.i - 1].content,
                ID: this.data.content[this.data.i - 1].hashId,
                openid: [{"_op":_op,"title":this.data.title},{"_op":"asdfasdf","title":this.data.title}],
                done: true
            }
        })
            .then(res => { })
    },

    collectFunca(){
        this.setData({
            titleHidden:"block"
        })
    },
    /**
     * 
     * @param {数组} array 
     * @param {要删除的项} val 
     */
    remov: function (array,val) {
        for(let i = 0 ; i<array.length;i++){
            if(array[i]._op == val){
                array.splice(i, 1)
                return array
            }
        }
    },


    onLoad: function (options) {
        this.bbb() 
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
        this.onGetOpenid()
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
        // wx.startPullDownRefresh()
        // console.log(1)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // console.log(2)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let id = this.data.content[this.data.i - 1].ID || this.data.content[this.data.i - 1].hashId
        return {
            title: "笑话集锦",
            path: '/pages/share/share?ID=' + id,
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
                //console.log('shareTickets', shareTickets);
                if (shareTickets.length == 0) {
                    return false;
                }
                wx.getShareInfo({
                    shareTicket: shareTickets[0],
                    success: function (res) {
                        //console.log('立即分享获得信息', res);
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
            complete() {
                //console.log(0)
            }
        }
    }
})