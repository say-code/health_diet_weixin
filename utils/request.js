const app = getApp()

const loginPage = ""


const request = (url, options, errmsg) => {
  console.log( wx.getStorageSync('sessionId'))
  return new Promise((resolve, reject) => {
    wx.showLoading();
    //  const token = wx.getStorageSync('authToken');
    // const token = app.globalData.authTokenc
    wx.request({
      url: `${app.globalData.apiHost}${url}`,
      method: options.method,
      data: options?.data || {},
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cookie': wx.getStorageSync('sessionId'),
        //  'Authorization': `Bearer ${token}`
      },
      success(request) {
        if (request.data.code === 1 ||request.data.code === 200) {
          resolve(request.data)
        } else {
          wx.showToast({
            title: request.msg || "未知错误",
            icon: "error"
          })
        }
      },
      fail(error) {
        reject(error.data)
      },
      complete() {
        wx.hideLoading();
      }
    })
  })
}

const get = (url, options = {}) => {
  return request(url, { method: 'GET', ...options })
}

const post = (url, options) => {
  return request(url, { method: 'POST', ...options })
}

const put = (url, options) => {
  return request(url, { method: 'PUT', ...options })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
  return request(url, { method: 'DELETE', ...options })
}

module.exports = {
  get,
  post,
  put,
  remove
}