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

    imageArray: [
      {
        image: '../image/Eat.png',
        title: '食堂约饭',
        time: '12:00~13:00',
        calendar:'4/1',
        url: '/pages/acti_detail/acti_detail',
      }, {
        image: '../image/Activity.png',
        title: '风筝-不一样的六一',
        time: '14:30~17:00',
        calendar:'6/1',
        url: '/pages/acti_detail/acti_detail',
      }, {
        image: '../image/Meeting.png',
        title: '有关人工智能的讲座',
        time: '16:00~17:00',
        calendar:'5/23~5/25',
        url: '/pages/acti_detail/acti_detail',
      }, {
        image: '../image/Sing.png',
        title: '放声歌唱',
        time: '20:00~22:00',
        calendar:'5/2',
        url: '/pages/acti_detail/acti_detail',
      }, {
        image: '../image/Sport.png',
        title: '夜跑-点亮生命',
        time: '16:00~17:00',
        calendar:'4/6',
        url: '/pages/acti_detail/acti_detail',
      }, {
        image: '../image/Study.png',
        title: '周末图书馆约学习',
        time: '8:00~22:00',
        calendar:'3/30',
        url: '/pages/acti_detail/acti_detail',
      }, {
        image: '../image/Eat.png',
        title: '寻找成都的美食',
        time: '8:00~12:00',
        calendar:'4/12',
        url: '/pages/acti_detail/acti_detail',
      }, {
        image: '../image/Meeting.png',
        title: '班长会议',
        time: '14:00~16:00',
        calendar:'4/15',
        url: '/pages/acti_detail/acti_detail',
      }
    ]
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  scroll(e) {
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
      url:'http://148.70.157.68:3000/act/query/name',
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
  
  //获取后台信息
  onLoad: function(options){
    var that = this;
    wx.request({
      url: 'http://148.70.157.68:3000/act/all',
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
      url: 'http://148.70.157.68:3000/act/all',
      success: function (res) {
        console.log(res.data);
      }
    })
  }
})