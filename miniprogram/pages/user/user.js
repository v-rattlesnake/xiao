// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },


    // 权限设置
    install:function(){
        wx.openSetting({
            success:res=>{
                console.log(res)
            }
        })
    },

    //  更多
    more(){
        wx.showToast({
            title:"拼命中构思中···",
            mask:true,
            icon:"none",
            success: () => {
                this.setData({
                    heightList:0,
                    opacity:0
                })
            }
        })
    },
})