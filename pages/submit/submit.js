// pages/submit/submit.js
var util = require('../../utils/util.js');
const app = getApp();
var time 
Page({

  /**
   * 页面的初始数据
   */
  data: util.json2Form({
    name:'活动名称',
    des:'活动描述',
    date:'2019-4-1',
    time:'16:00',
    allValue:''
  }),

  formReset:function(e){
    console.log('form发生了reset事件',e.detail.value)
    this.setData({
      allValue:''
    })
  },
  formSubmit:function(e){
    console.log('form 发生了submit事件', e.detail.value)
    this.setData({
      allValue:e.detail.value
    })
    if (e.detail.value.name == 0) {
      wx.showToast({
        title: '名称不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else {
      wx.request({
        url: 'http://dannydiao.com:3000/act',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          name: e.detail.value.name,
          des: e.detail.value.des,
          date:e.detail.value.date,
          time:e.detail.value.time,
          capacity:e.detail.value.capacity
        },
        success: function(res) {
          console.log(res.data);
          if (res.data.status == 0) {
            wx.showToast({
              title:'fail',
              icon: 'loading',
              duration: 1500
            })
          } else {
            wx.showToast({
              title:'success',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    }
  },

//日期时间选择器
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },

//上传图片
uploadImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数
      sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })

        wx.uploadFile({
          url: 'http://dannydiao.com:3000/pic',
          filePath: tempFilePaths[0],
          name: 'uploadfile_ant',
          formData: {
          },
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
            console.log(data);
          },
          fail: function (res) {
            wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
              success: function (res) { }
            })
          }
        });
      }
    });
  }

})
