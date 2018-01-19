// 抓取数据的方法
function fetchData(url) {
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'json'// 豆瓣不能给application
      },
      success: resolve,
      fail: reject,
    })
  })
  return promise;
}
function starsToArray(score) {
  let star = score.slice(0, 1);
  let arr = [];
  for (let i = 0; i < star; i++) {
    arr.push(1);
  }
  for (let i = 0; i < 5 - star; i++) {
    arr.push(0);
  }
  return arr;
}
export { fetchData, starsToArray }