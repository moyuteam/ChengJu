//app.js

App({

  

  onLaunch: function () {

    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: function (res) {
        console.log(res.code)
        //发送请求
        wx.request({
          url: 'http://148.70.157.68:3000/user/isRegister', //刁溯服务器接口
          data: {
            code: res.code 
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //默认值
          },
          success: function (res) {
            console.log(res.data)
              that.globalData.userID = res.data.openID
              that.globalData.stuID = res.data.stuID
              that.globalData.stuName = res.data.name
            if (res.data.isRegister){
              that.globalData.stuID = res.data.stuID
              wx.switchTab({
                url: '../../pages/acti_list/acti_list'
              })
            }            
          },

          fail: function(err){
            console.log('fail.....')
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  globalData: {
    userInfo: null,
    userID:'',
    isRegister:'',
    stuID:'',
    stuName:''
  },

})