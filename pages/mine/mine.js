// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuTop: '',
    currentData: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
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

    var that = this;
    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.select('#fix').boundingClientRect()//选择Id的节点，获取节点位置信息的查询请求
    query.exec(function (res) {
      console.log(res[0].top); // #fix节点的上边界坐标
      that.setData({
        menuTop: res[0].top
      })
    });
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

  /**
   * 监听滚动事件
   */
  onPageScroll: function (e) {
    console.log(e);//{scrollTop:99}
    var that = this;
    //当页面滚动距离scrollTop > menuTop某元素距离文档顶部的距离时，某元素固定定位
    if (e.scrollTop > that.data.menuTop) {
      that.setData({
        menuFixed: true
      })
    } else {
      that.setData({
        menuFixed: false
      })
    }
  }    
})