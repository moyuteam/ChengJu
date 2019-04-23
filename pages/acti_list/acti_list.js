// pages/index1/index1.js
const order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    toView: 'red',
    scrollTop: 100,
    title:'',
    time:'',
    date:'',
    searchItem:false,
    Pics:[],
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },

  //搜索框文本内容显示
  inputBind: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
    console.log('bindInput' + this.data.inputValue)
  },

  //搜索执行按钮
  query: function (event) {
    this.setData({
      searchItem: true
    })
    var that = this
    wx.request({
      url:'https://diaosudev.cn:3000/act/query/name',
      data:{
        name: this.data.inputValue
      },
      methods:'GET',
      success: function(res){
        console.log(res.data)
        var searchData = res.data.queryAct
        that.setData({
          queryAct: searchData
        }),
        
        wx.setStorage({
          key:'searchLists',
          data:{
            searchLists: res.data
          }
        })


/*
        if(!that.data.inputValue){
          wx.showToast({
            title:'请重新输入',
            icon:'loading',
            duration:2000,
          })
        } else if (searchData.search.length == 0){
          wx.showToast({
            title:'关键词不存在',
            icon:'loading',
            duration:2000,
          })
        } else {
          var searchIndex = searchData.search.length
          var d = 0;
          for (var i = 0; i <= searchIndex - 1; i++){
            var searchTitle = searchData.search[d].title.console.log(searchTitle)
            d = d + 1;

            for (var x = 0; x <= searchTitle.length; x++) {
              for (var y = 0; y <= searchTitle.length; y++) { 
                var keyWord = searchTitle.length.substring(x, y);
                console.log(keyWord)                
               }
            }

            wx.navigateTo({
              url: 'pages/acti_list' ,
            })
          }
        }*/
      }
    })
  },
  
onShow: function(){
  this.setData({
    searchItem: false
  })
  this.onLoad()
},

  //获取后台信息
  onLoad: function(options){
    var that = this;
    wx.request({
      url: 'https://diaosudev.cn:3000/act/all',
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          allAct: res.data.allAct
        });
      },
      fail: function (err) {
        console.log("....fail....");
        console.log(err.data);
      }
    });

    wx.downloadFile({
      url: 'https://diaosudev.cn:3000/act/all',
      success: function (res) {
        console.log(res.data);
      }
    })
  }
})