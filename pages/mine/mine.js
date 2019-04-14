// pages/mine/mine.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID:'',
    StudentName:'',
    StudentId:'',
    inputValue: '',
    message: 'Hello Minia~',
    toView: 'red',
    scrollTop: 100,
    imageArray: [
      {
        color: 'white',
        image: '../image/Eat.png',
        title: '食堂约饭',
        time: '12:00~13:00',
        calendar: '4/1',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'yellow',
        image: '../image/Activity.png',
        title: '风筝-不一样的六一',
        time: '14:30~17:00',
        calendar: '6/1',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'blue',
        image: '../image/Meeting.png',
        title: '有关人工智能的讲座',
        time: '16:00~17:00',
        calendar: '5/23~5/25',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'green',
        image: '../image/Sing.png',
        title: '放声歌唱',
        time: '20:00~22:00',
        calendar: '5/2',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'red',
        image: '../image/Sport.png',
        title: '夜跑-点亮生命',
        time: '16:00~17:00',
        calendar: '4/6',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'white',
        image: '../image/Study.png',
        title: '周末图书馆约学习',
        time: '8:00~22:00',
        calendar: '3/30',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'white',
        image: '../image/Eat.png',
        title: '寻找成都的美食',
        time: '8:00~12:00',
        calendar: '4/12',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'white',
        image: '../image/Meeting.png',
        title: '班长会议',
        time: '14:00~16:00',
        calendar: '4/15',
        url: '/pages/acti_detail/acti_detail',
      }
    ]
  },

  scroll(e) {
    console.log(e)
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  tap(e) {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    that.setData({
      openID: app.globalData.userID
    })
  
    //获取姓名学号
    wx.request({
      url: 'http://148.70.157.68:3000/user/exchange?openID=' + that.data.openID, // 接口地址
     
      
      success(res) {
        console.log('----------')
        console.log(res.data)
        that.setData({
          StudentName: res.data.name,
          StudentID: res.data.stuID
        })
      }
    })


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