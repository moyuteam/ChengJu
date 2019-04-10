// pages/sign/sign.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit:function(e){
      var that = this;
      wx.request({
        url: '',
        data:{

        },
        method:'POST',
        success:function(res){
          //绑定ownerID
        }
      })
    }
})