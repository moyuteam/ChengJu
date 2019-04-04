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
    Pics:[],

    imageArray: [
      {
        color: 'white',
        image: '../image/Eat.png',
        title: '食堂约饭',
        time: '12:00~13:00',
        calendar:'4/1',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'yellow',
        image: '../image/Activity.png',
        title: '风筝-不一样的六一',
        time: '14:30~17:00',
        calendar:'6/1',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'blue',
        image: '../image/Meeting.png',
        title: '有关人工智能的讲座',
        time: '16:00~17:00',
        calendar:'5/23~5/25',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'green',
        image: '../image/Sing.png',
        title: '放声歌唱',
        time: '20:00~22:00',
        calendar:'5/2',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'red',
        image: '../image/Sport.png',
        title: '夜跑-点亮生命',
        time: '16:00~17:00',
        calendar:'4/6',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'white',
        image: '../image/Study.png',
        title: '周末图书馆约学习',
        time: '8:00~22:00',
        calendar:'3/30',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'white',
        image: '../image/Eat.png',
        title: '寻找成都的美食',
        time: '8:00~12:00',
        calendar:'4/12',
        url: '/pages/acti_detail/acti_detail',
      }, {
        color: 'white',
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
    var that = this
    console.log(this.detail.value)
  },
  
  //获取后台信息
  onLoad: function(options){
    var that = this;
    var actID = '1';
    wx.request({
      url:'http://dannydiao.com:3000/act',
      method: 'GET',
      data:{
        actID: actID
      },
      header:{
        "Content-Type": "application/json"
      },
      success: function(res){
        console.log(res.data);
        var PIC=[];
        for(var i=0;i < res.data.data.type.length;i++){
          for (var j = 0; j < res.data.data.type[i].length; j++){
            PIC.push(Pic)
          }
        } 
        console.log(res)
        that.setData({
          Pics:PIC
        });
      },
      fail: function(res){
        console.log("....fail....");
        console.log(res.data);
      }
    })
  }
})