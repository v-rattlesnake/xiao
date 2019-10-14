// pages/index1/index1.js
// import nav from "" 

const app = getApp()
const db = wx.cloud.database()
let shuijiI="",hottest=""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: app.globalData.height,
        content: [{
            "content": "女生分手的原因有两个，\r\n一个是：闺蜜看不上。另一个是：闺蜜看上了。",
            "hashId": "607ce18b4bed0d7b0012b66ed201fb08",
            "unixtime": 1418815439,
            "updatetime": "2014-12-17 19:23:59"
        },
        {
            "content": "老师讲完课后，问道\r\n“同学们，你们还有什么问题要问吗？”\r\n这时，班上一男同学举手，\r\n“老师，这节什么课？”",
            "hashId": "20670bc096a2448b5d78c66746c930b6",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "“老公，结婚前你不是常对我说，我是你的女神吗？”\r\n“老婆，现在你总该看出来，自从结婚后，我成了一个无神论者。”",
            "hashId": "1a0b402983f22b7ad6ff38787e238f6d",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "昨天下班坐公交车回家，白天上班坐着坐多了想站一会儿，\r\n就把座位让给了一个阿姨，阿姨道谢一番开始和我聊天，聊了挺多的。\r\n后来我要下车了，阿姨热情的和我道别。\r\n下车的一瞬间我回头看了一眼，只见那阿姨对着手机说：“儿子，\r\n刚才遇见一个姑娘特不错，可惜长得不好看，不然我肯定帮你要号码！”\r\n靠，阿姨你下车，我保证不打死你！",
            "hashId": "d4d750debbb73ced161066368348d611",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "小时候妈妈喂我饭之前会看书，我问她看的什么时。\r\n妈妈总是笑着告诉我：“是《育儿经验宝典》啊！”\r\n我很感动，直到我认识字才发现，妈妈看的是《猪崽饲养手册》。",
            "hashId": "d6161d9d7b113a920e7b33b25c3b5f0b",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "刚刚在舞蹈学校外接儿子，听到两个已经接到孩子到妈妈在聊天。\r\n妈妈甲：“你闺女这么小就是个美人胚子，大眼睛，双眼皮，瓜子脸。”\r\n妈妈乙：“是啊，长大了不知道要祸害多少男孩！”",
            "hashId": "6a6313c771b5bbc5b5688a926dcc836e",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "和室友说我约了一个女孩过夜，\r\n临出门室友提醒我：“要采取安全措施啊，保护好自己，你要没有我借你。”\r\n“不用不用，我自己有。”说完我马上打开抽屉，翻出一把刀带着出门了。",
            "hashId": "7d877e3ba86819a523175656e97b9cdf",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "“科学研究发现，睡眠不足会带来许多身心伤害：免疫力下降、\r\n记忆力减弱、易衰老、失去平衡等等，从而引发多种疾病。\r\n从科学角度讲，睡懒觉有助于身心健康。” \r\n“所以，李老师，这就是你在课堂上睡觉的原因？”校长生气的问我。",
            "hashId": "cb01359d7740e19435b9ea4e2d5516a1",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "做饭的时候发现没食用油了，\r\n就叫五岁的儿子“娃儿，去楼下小商店买壶油，顺便买点姜回来。别搞忘了。”\r\n儿子答应，边出门边念叨“油，姜，油，姜，油，姜，油…………”\r\n果然，回来带了瓶酱油……",
            "hashId": "473a3a81c621e03afadf453c23c989b5",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "我妈研究了几个新菜，邀请我品尝，\r\n结果我没有给她一个yes，被臭骂了一顿，\r\n要和我断绝关系。找我爸评理，\r\n老头说为了公平起见，我还是尝尝菜吧。\r\n吃完后，老头幽幽的说道，你和我也断绝关系吧。",
            "hashId": "8251a1ff78568624730f3d6ae8de7c6f",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        }],
        content1: [{
            "content": "女生分手的原因有两个，\r\n一个是：闺蜜看不上。另一个是：闺蜜看上了。",
            "hashId": "607ce18b4bed0d7b0012b66ed201fb08",
            "unixtime": 1418815439,
            "updatetime": "2014-12-17 19:23:59"
        },
        {
            "content": "老师讲完课后，问道\r\n“同学们，你们还有什么问题要问吗？”\r\n这时，班上一男同学举手，\r\n“老师，这节什么课？”",
            "hashId": "20670bc096a2448b5d78c66746c930b6",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "“老公，结婚前你不是常对我说，我是你的女神吗？”\r\n“老婆，现在你总该看出来，自从结婚后，我成了一个无神论者。”",
            "hashId": "1a0b402983f22b7ad6ff38787e238f6d",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "昨天下班坐公交车回家，白天上班坐着坐多了想站一会儿，\r\n就把座位让给了一个阿姨，阿姨道谢一番开始和我聊天，聊了挺多的。\r\n后来我要下车了，阿姨热情的和我道别。\r\n下车的一瞬间我回头看了一眼，只见那阿姨对着手机说：“儿子，\r\n刚才遇见一个姑娘特不错，可惜长得不好看，不然我肯定帮你要号码！”\r\n靠，阿姨你下车，我保证不打死你！",
            "hashId": "d4d750debbb73ced161066368348d611",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "小时候妈妈喂我饭之前会看书，我问她看的什么时。\r\n妈妈总是笑着告诉我：“是《育儿经验宝典》啊！”\r\n我很感动，直到我认识字才发现，妈妈看的是《猪崽饲养手册》。",
            "hashId": "d6161d9d7b113a920e7b33b25c3b5f0b",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "刚刚在舞蹈学校外接儿子，听到两个已经接到孩子到妈妈在聊天。\r\n妈妈甲：“你闺女这么小就是个美人胚子，大眼睛，双眼皮，瓜子脸。”\r\n妈妈乙：“是啊，长大了不知道要祸害多少男孩！”",
            "hashId": "6a6313c771b5bbc5b5688a926dcc836e",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "和室友说我约了一个女孩过夜，\r\n临出门室友提醒我：“要采取安全措施啊，保护好自己，你要没有我借你。”\r\n“不用不用，我自己有。”说完我马上打开抽屉，翻出一把刀带着出门了。",
            "hashId": "7d877e3ba86819a523175656e97b9cdf",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "“科学研究发现，睡眠不足会带来许多身心伤害：免疫力下降、\r\n记忆力减弱、易衰老、失去平衡等等，从而引发多种疾病。\r\n从科学角度讲，睡懒觉有助于身心健康。” \r\n“所以，李老师，这就是你在课堂上睡觉的原因？”校长生气的问我。",
            "hashId": "cb01359d7740e19435b9ea4e2d5516a1",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "做饭的时候发现没食用油了，\r\n就叫五岁的儿子“娃儿，去楼下小商店买壶油，顺便买点姜回来。别搞忘了。”\r\n儿子答应，边出门边念叨“油，姜，油，姜，油，姜，油…………”\r\n果然，回来带了瓶酱油……",
            "hashId": "473a3a81c621e03afadf453c23c989b5",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        },
        {
            "content": "我妈研究了几个新菜，邀请我品尝，\r\n结果我没有给她一个yes，被臭骂了一顿，\r\n要和我断绝关系。找我爸评理，\r\n老头说为了公平起见，我还是尝尝菜吧。\r\n吃完后，老头幽幽的说道，你和我也断绝关系吧。",
            "hashId": "8251a1ff78568624730f3d6ae8de7c6f",
            "unixtime": 1418814837,
            "updatetime": "2014-12-17 19:13:57"
        }],
        i: 1,
        collect: true,
        lookUp:"",
        openid:"",
        tab:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    bbb: function () {
        wx.request({
            url: app.globalData.url + "/content/list.php",
            data: {
                key: "988b56b817df13431fd954d1db05df25",
                page: 2
            },
            success: (res) => {
                this.setData({
                    // content:res.data.result
                    // content1:res.data.result
                })
            }
        })
    },

    // 左右滑动
    swiperchange: function (e) {
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
            tab:true,
            i:shuijiI
        })
        this.collectLook(this.data.i - 1)
    },
    // 最热
    hottest: function () {
        shuijiI = this.data.i
        db.collection("collect").get()
        .then((res)=>{
            this.setData({
                content:res.data,
                tab:false,
                i:hottest||1
            })
            this.collectLook(this.data.i - 1)
        })
    },

    // 收藏、取消收藏
    collectFunc: function () {
        if (this.data.collect) {//第一次被收藏
            this.setData({
                collect: false
            })
            if(this.data.lookUp){//被收藏过
                db.collection('collect').where({
                    ID:this.data.content[this.data.i - 1].hashId||this.data.content[this.data.i - 1].ID,
                })
                .get({
                    success: (res) => {
                        let openidArr = res.data[0].openid
                        openidArr.push(this.data.openid)
                        db.collection('collect').doc(res.data[0]._id).update({
                            data: {
                                openid: openidArr
                            }
                        })
                        .then()
                        .catch()
                    }
                })
                return
            }
            this.setData({
                lookUp:true
            })
            db.collection('collect').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    content: this.data.content[this.data.i - 1].content,
                    ID: this.data.content[this.data.i - 1].hashId,
                    openid: [app.globalData.openid,"adfklhasjkdfh"],
                    done: true
                }
            })
            .then(res => {})
        } else { //取消收藏
            this.setData({
                collect: true
            })
            db.collection('collect').where({
                openid:app.globalData.openid
            })
            .get({
                success: (res) => {
                    for(let i = 0;i<res.data.length; i++){
                        if(this.data.content[this.data.i-1].hashId==res.data[i].ID){
                            db.collection('collect').doc(res.data[i]._id).update({
                                data: {
                                    openid:this.remov(res.data[i].openid,app.globalData.openid) 
                                }
                            })
                            .then(console.log)
                            .catch(console.error)
                        }
                    }
                    
                }
            })
        }

    },
    //查看是否被当前用户收藏
    collectLook: function (i = 0) {
        db.collection('collect').where({
            ID: this.data.content[i].hashId||this.data.content[i].ID,
            openid: this.data.openid
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
    collectLookUp: function (i = 0) {
        db.collection('collect').where({
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

    onGetOpenid: function () {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                app.globalData.openid = res.result.openid
                this.setData({
                    openid:res.result.openid
                })
                this.collectLook()
                this.collectLookUp()
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
            }
        })
    },

    // 分享
    share:function(){},
    /**
     * 
     * @param {数组} array 
     * @param {要删除的项} val 
     */
    remov:function(array,val){
        let index = array.indexOf(val)
        array.splice(index,1)
        return array
    },
    onLoad: function (options) {
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // this.bbb()
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