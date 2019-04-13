// pages/acti_detail/acti_detail.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID:'',
    actID:'',
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      actID:options.actID
    })
    var that = this;
    wx.request({
      url: 'http://148.70.157.68:3000/act',
      method: 'GET',
      data:{
        actID: this.data.actID,
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

  },

  onSignIn() {
    this.setData({
      signIn: true
    })
    var that = this;
    that.setData({
      openID: app.globalData.userID
    })
    wx.request({
      url: 'http://148.70.157.68:3000/user',
      data: { 
        openID: that.data.openID,
        joinAct: saf
      },
      method: 'PUT', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },// 设置请求的 header
      success: function (res) {
        if (res.statusCode == 200) {

        } else {
          console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode);
        }
      },
      fail: function () {
        console.log("index.js wx.request CheckCallUser fail");
      },
      complete: function () {
        // complete
      }
    })
  },

  onCancelCreate(){
    this.setData({
      signIn: false
    })
  },

  onAddActi(){
    this.setData({
      signIn: false
    })
  }
})