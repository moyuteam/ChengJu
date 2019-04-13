// pages/sign/sign.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     openID:'',
  },


  formSubmit:function(e){

    var that = this
    that.setData({
      openID: app.globalData.userID
    })

      wx.request({
        url: 'http://148.70.157.68:3000/user',
        data:{
          name:e.detail.value.name,
          stuID:e.detail.value.stuID,
          openID:that.data.openID  
        },
        method:'POST',
        success:function(res){
          //绑定ownerID
          console.log(res.data)

          wx.switchTab({
            url: '../../pages/acti_list/acti_list'
          })
        }
      })
    }
})