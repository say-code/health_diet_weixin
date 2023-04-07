// pages/myCart/myCart.js
const req = require('../../utils/request');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: 'https://tdesign.gtimg.com/miniprogram/images/cell1.png',
    dishList: [],
    money: 0
  },

  onLoad() {
    this.init()
  },

  onShow() {
    this.getTabBar().init();
    // console.log(1)
    this.init()
  },

  init() {
    req.get("/shoppingCart/list").then(
      (res) => {
        let dataValue = res.data;
        for (let i = 0; i < dataValue.length; i++) {
          dataValue[i].image = app.globalData.apiHost + "//common/download?name=" + dataValue[i].image
        }
        this.setData({
          dishList: dataValue
        });
        this.calcMoney();
      }
    )
  },

  handleChange(e) {
    console.log(e);
    const { value } = e.detail;
    let index = e.currentTarget.dataset.index;
    // console.log(index)
    if (value < this.data.dishList[index].number) {
      req.post("/shoppingCart/sub", { data: this.data.dishList[index] }).then(
        (res) => {
          this.data.dishList[index].number = value
          if (value === 0) {
            this.data.dishList.splice(index, 1)
          }
          this.setData({
            dishList: this.data.dishList
          });
          this.calcMoney();
        },

      )
    }
    else if (value > this.data.dishList[index].number) {
      req.post("/shoppingCart/add", { data: this.data.dishList[index] }).then(
        (res) => {
          this.data.dishList[index].number = res.data.number
          this.setData({
            dishList: this.data.dishList
          });
          this.calcMoney();
        },

      )
    }
    console.log(this.data.dishList)

  },

  dishOnClick(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/goods/myGoods/myGoods?id=' + id,
    });

  },

  calcMoney() {
    let money = 0;
    for (let i = 1; i < this.data.dishList.length; i++) {
      money += this.data.dishList[i].number * this.data.dishList[i].amount;
    }
    this.setData({
      money: money
    })
  },

  switchToCart(e) {
    req.remove("/shoppingCart/clean");
    this.init();
  },

  onPullDownRefresh: function () {
    this.init();
    wx.stopPullDownRefresh();
  }
})