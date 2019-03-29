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
        title: 'Eat at dining hall',
        time: '12:00~13:00  4-1',
      }, {
        color: 'yellow',
        image: '../image/Activity.png',
        title: 'Flying kites with kids',
        time: '14:30~17:00  6-1',
      }, {
        color: 'blue',
        image: '../image/Meeting.png',
        title: 'Meeting about AI',
        time: '16:00~17:00  5-23~5-25',
      }, {
        color: 'green',
        image: '../image/Sing.png',
        title: 'Sing aloud in public',
        time: '20:00~22:00  5-2',
      }, {
        color: 'red',
        image: '../image/Sport.png',
        title: 'Having sports at night',
        time: '16:00~17:00  4-6',
      }, {
        color: 'white',
        image: '../image/Study.png',
        title: 'Self-study with partners',
        time: '8:00~22:00  3-30',
      }, {
        color: 'white',
        image: '../image/Eat.png',
        title: 'Seek for the best snack in CD',
        time: '8:00~12:00  4-12',
      }, {
        color: 'white',
        image: '../image/Meeting.png',
        title: 'Wellknown people come to speech',
        time: '14:00~16:00  4-15',
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