// pages/sign/sign.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },


  formSubmit:function(e){
      var that = this;
    wx.switchTab({
      url: '../../pages/acti_list/acti_list'
    })
      wx.request({
        url: '',
        data:{
          name:e.detail.value.name,
          stuID:e.detail.value.styID,
          openId:app.globalData.userID    
        },
        method:'POST',
        success:function(res){
          //绑定ownerID
          
        }
      })
    }
})