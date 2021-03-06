import { fetchData } from '../../../util/util.js';
Page({
  timer: '',

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    movies: []
  },
  valToSearch(e) {
    let val = e.detail.value;
    if (val) {
      this.setData({
        flag: false
      })
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        fetchData('https://api.douban.com/v2/movie/search?q=' + val).then(res => {
          this.processData(res);
          console.log(res)
        })
      }, 500)

    } else {
      clearTimeout(this.timer)
      this.setData({
        flag: true,
        movies: []
      })
    }
  },
  processData(res) {
    let datas = res.data.subjects;
    let arr = [];
    for (let i = 0; i < datas.length; i++) {
      let cur = datas[i];
      let temp = {};
      temp.image = cur.images.small;
      temp.title = cur.title;
      temp.average = cur.rating.average; 
      temp.year = cur.year;
      arr.push(temp);
    }
    this.setData({
      movies: arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})