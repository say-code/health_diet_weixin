// pages/logIn/logIn.js
const req = require('../../utils/request');
const app = getApp()

Page({
  onShow() {
  },
  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: ''
  },

  getSession() {
    req.get("/wx/api/getSessionId")
      .then((res) => {
        console.log("res" + res.data)
        app.globalData.cookie = res.data
        // datas = res.data
        wx.setStorageSync('sessionId', "JSESSIONID=" + res.data)
      })
  },

  getCode() {
    // this.getSession()
    // console.log("as")
    console.log("a" + wx.getStorageSync('sessionId'))
    wx.request({
      url: `${app.globalData.apiHost}/user/sendMsg`,
      method: 'POST',
      data: { phone: this.data.phone },
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cookie': wx.getStorageSync('sessionId'),
        //  'Authorization': `Bearer ${token}`
      },
    })
    // console.log("app" + wx.getStorageSync('sessionId'))
    // req.post("/user/sendMsg", { data: { phone: this.data.phone } }

    // )

    // wx.setStorageSync('sessionId', datas)
  },


  formSubmit() {
    req.post("/user/login", { data: { phone: this.data.phone, code: this.data.code } })
    .then((res) => {
      // const token = res.data.access_token;
      // wx.setStorageSync('access_token', token);
      console.log("userInfo" + res.data)
      wx.setStorageSync('name', res.data.name)
      wx.setStorageSync('sex', res.data.sex)
      wx.setStorageSync('phone', res.data.phone)
      wx.showToast({
        title: '登入成功！',
      });
      wx.switchTab({
        url: '/pages/home/home',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSession()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})