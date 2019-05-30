// pages/acti_detail/acti_detail.js

const app = getApp()

var actID =''
var joinAct=new Array(0)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signIn:false,
    content: {
      image: '../image/Kites.PNG',
      title: '风筝-不一样的六一',
      time: '14:30~17:00',
      calendar: '6/1',
      place: '清水河人民公园',
      number: '10',
      detail: '风筝是由古代劳动人民发明于中国东周春秋时期，至今已2000多年。相传墨翟以木头制成木鸟，研制三年而成，是人类最早的风筝起源。后来鲁班用竹子，改进墨翟的风筝材质，更而演进成为今日多线风筝。传\“墨子为木鸢，三年而成，蜚一日而败\”。到南北朝时，风筝开始成为传递信息的工具；从隋唐开始，由于造纸业的发达，民间开始用纸来裱糊风筝；到了宋代，放风筝成为人们喜爱的户外活动。宋人周密《武林旧事》写道：\“清明时节，人们到郊外放风鸢，日暮方归。\”\“鸢\”就指风筝。北宋张择端的《清明上河图》，宋苏汉臣的《百子图》里都有放风筝的生动景象。',
    }
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  show(){
    this.onLoad()
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      actID:options.actID
    })
    var that = this;
    wx.request({
      url: 'https://diaosudev.cn:3000/act',
      method: 'GET',
      data:{
        actID: this.data.actID,
        stuID: app.globalData.stuID
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          content: res.data
        });
      },
      fail: function (err) {
        console.log("....fail....");
        console.log(err.data);
      }
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
    if (res.from === 'button') {

    }
    return {
      title: '转发',
      path: '/pages/acti_detail/acti_detail',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },

  onSignIn() {
    this.setData({
      signIn: true
    })
  },

  onCancelCreate(){
    this.setData({
      signIn: false
    })
  },

  onAddActi(){
    this.setData({
      signIn: false,
      actID: this.data.actID,
      isJoin: true,
    })
    var that = this;
    joinAct.push(this.data.actID)
    wx.request({
      url: 'https://diaosudev.cn:3000/user',
      data: {
        stuID: app.globalData.stuID,
        joinAct: joinAct
      },
      method: 'PUT', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },// 设置请求的 header
      success: function (res) {
        console.log(res.data)
        console.log(that.data.actID)
        wx.request({
          url: 'https://diaosudev.cn:3000/act',
          method: 'GET',
          data: {
            actID: that.data.actID,
            stuID: app.globalData.stuID
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              content: res.data
            });
          },
          fail: function (err) {
            console.log("....fail....");
            console.log(err.data);
          }
        })
        
      },
      fail: function () {
        console.log("index.js wx.request CheckCallUser fail");
      },
      complete: function () {
        // complete
      }
    })
  }
})