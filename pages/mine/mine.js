// pages/mine/mine.js


var util = require('../../utils/util.js');

const app = getApp()
var join_Act = new Array(0)
var release_Act = new Array(0)
var joined_Act = new Array(0)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    join:[],
    release:[],
    joined:[],
    openID:'',
    StudentName:'',
    StudentId:'',
    inputValue: '',
    message: 'Hello Minia~',
    toView: 'red',
    scrollTop: 100,
    currentData:0,
    now:''
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

    var time = util.formatTime(new Date());
    this.setData({
      now: time
    });

    var that = this
    that.setData({
      StudentID:app.globalData.stuID,
      StudentName: app.globalData.stuName
    });
    // 已报名界面
    wx.request({
      url: 'https://diaosudev.cn:3000/act/join',
      method: 'GET',
      data: {
        stuID: app.globalData.stuID
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
        join_Act = []
        joined_Act = []
        var i = 0
        while(res.data.joinAct[i]){
          var a = res.data.joinAct[i++].actID
          wx.request({
            url: 'https://diaosudev.cn:3000/act',
            method: 'GET',
            data: {
              actID: a
            },
            header: {
              "Content-Type": "application/json"
            },
            success: function(res){
              join_Act.push(res.data)
              that.setData({
                join: join_Act
              })
              if (that.data.now.substring(0, 10) > res.data.date){
                joined_Act.push(res.data)
                that.setData({
                  joined: joined_Act
                })
              }
            }
          })
        } 
      },
      fail: function (err) {
        console.log("....fail....");
        console.log(err.data);
      }
    });
    // 已发布界面
    wx.request({
      url: 'https://diaosudev.cn:3000/act/released',
      method: 'GET',
      data: {
        stuID: app.globalData.stuID
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
        release_Act = []
        var i = 0
        while (res.data.releasedAct[i]) {
          var a = res.data.releasedAct[i++].actID
          wx.request({
            url: 'https://diaosudev.cn:3000/act',
            method: 'GET',
            data: {
              actID: a
            },
            header: {
              "Content-Type": "application/json"
            },
            success: function (res) {
              release_Act.push(res.data)
              that.setData({
                release: release_Act
              })
            }
          })
        }
      },
      fail: function (err) {
        console.log("....fail....");
        console.log(err.data);
      }
    });
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
    this.onLoad();
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