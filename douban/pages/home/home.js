import { fetchData, starsToArray } from '../../util/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {
      movies: [],
      name: '近期上映'
    },
    comingSoon: {
      movies: [],
      name: '即将上映'
    },
    top250: {
      movies: [],
      name: 'top250'
    }
  },
  tomore(e) {
    let val = e.currentTarget.dataset.more;
    wx.navigateTo({
      url: 'detail/detail?type=' + val,
    })
  },
  tosearch(){
    wx.navigateTo({
      url: 'search-page/search-page',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 默认返回20条数据，显示6条
    fetchData('https://api.douban.com/v2/movie/in_theaters?star=0&count=6').then(res => {
      this.processData(res, '近期上映', 'inTheaters');// processData()是Page对象的方法 this指向的是Page对像
    }),
      fetchData('https://api.douban.com/v2/movie/coming_soon?star=0&count=6').then(res => {
      this.processData(res, '即将上映', 'comingSoon');
    }),
      fetchData('https://api.douban.com/v2/movie/top250?star=0&count=6').then(res => {
      this.processData(res, 'top250', 'top250');
    })
  },
  processData(res, name, type) {
    let datas = res.data.subjects;// 获取所有数据
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
    };
    let obj = {};
    obj[type] = {
      movies: arr,
      name
    }
    this.setData(obj)
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