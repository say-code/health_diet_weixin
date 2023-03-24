// pages/goods/myGoods/myGoods.js
const req = require('../../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tittle: '未命名',
    price: 0,
    desc: '暂无',
    flavor: '暂无',
    img: '/images/food-back.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id
    req.get("/dish/" + id).then(
      (res) => {
        let result = res.data;
        console.log(result)
        this.setData({
          id: id,
          img: result.image,
          tittle: result.name,
          price: result.price,
          desc: result.description,
          flavor: result.flavors,
          businessId: result.businessId
        })
      }
    )
  },

  addCart() {
    req.post("/shoppingCart/add", {
      data: {
        dishId: this.data.id,
        number: 1,
        amount: this.data.price,
        businessId: this.data.businessId
      }
    }).then(
      wx.navigateBack()
    )
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