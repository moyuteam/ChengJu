// pages/index1/index1.js
const order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: 'Hello Minia~',
    toView: 'red',
    scrollTop: 100,
    imageArray: [
      {
        color: 'white',
        image: '../image/Eat.png',
        title: '食堂约饭',
        time: '12:00~13:00',
        calendar:'4/1',
      }, {
        color: 'yellow',
        image: '../image/Activity.png',
        title: '风筝-不一样的六一',
        time: '14:30~17:00',
        calendar:'6/1',
      }, {
        color: 'blue',
        image: '../image/Meeting.png',
        title: '有关人工智能的讲座',
        time: '16:00~17:00',
        calendar:'5/23~5/25',
      }, {
        color: 'green',
        image: '../image/Sing.png',
        title: '放声歌唱',
        time: '20:00~22:00',
        calendar:'5/2',
      }, {
        color: 'red',
        image: '../image/Sport.png',
        title: '夜跑-点亮生命',
        time: '16:00~17:00',
        calendar:'4/6',
      }, {
        color: 'white',
        image: '../image/Study.png',
        title: '周末图书馆约学习',
        time: '8:00~22:00',
        calendar:'3/30',
      }, {
        color: 'white',
        image: '../image/Eat.png',
        title: '寻找成都的美食',
        time: '8:00~12:00',
        calendar:'4/12',
      }, {
        color: 'white',
        image: '../image/Meeting.png',
        title: '班长会议',
        time: '14:00~16:00',
        calendar:'4/15',
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
  }
})