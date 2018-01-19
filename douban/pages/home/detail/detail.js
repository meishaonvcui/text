import { fetchData, starsToArray } from '../../../util/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    let str = '';
    switch (type) {
      case '近期上映':
        str = 'https://api.douban.com/v2/movie/in_theaters';
        break;
      case '即将上映':
        str = 'https://api.douban.com/v2/movie/coming_soon';
        break;
      case 'top250':
        str = 'https://api.douban.com/v2/movie/top250';
        break;
    }
    fetchData(str).then(res => {
      this.processData(res)
    });
    this.setData({
      url: str
    })
  },
  lazyLoad() {
    let count = this.data.count + 20;
    this.setData({
      count
    })
    wx.showNavigationBarLoading();
    fetchData(this.data.url + "?start=" + count + '&count=20').then(res => {
      this.processData(res)
    })
  },
  processData(res) {
    let datas = res.data.subjects;
    let arr = [];
    for (let i = 0; i < datas.length; i++) {
      let cur = datas[i];
      let temp = {
        images: cur.images.medium,
        title: cur.title,
        rating: {
          stars: starsToArray(cur.rating.stars),
          average: cur.rating.average
        }
      }
      arr.push(temp)
    }
    if (this.data.movies.length > 0) {
      let arr = this.data.movies.concat(arr);
    }
    this.setData({
      movies: arr
    })
    wx,wx.hideNavigationBarLoading()
    console.log(arr)
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