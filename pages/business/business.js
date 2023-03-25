const image = 'https://tdesign.gtimg.com/miniprogram/images/example2.png';
// const items = new Array(12).fill({ name: '标题文字' }, 0, 12);
const req = require('../../utils/request');
Page({
  offsetTopList: [],
  data: {
    tittle: null,
    sellNumber: 0,
    businessDetial: null,
    money: 0,
    sideBarIndex: 0,
    scrollTop: 0,
    categories: [
      //   {
      //     label: '选项四',
      //     title: '标题四',
      //     badgeProps: {
      //       count: 8,
      //     },
      //     items: items.slice(0, 8),
      //   },
      //   {
      //     label: '选项五',
      //     title: '标题五',
      //     badgeProps: {},
      //     disabled: true,
      //     items: [],
      //   },
    ],
  },
  onSideBarChange(e) {
    const { value } = e.detail;

    this.setData({ sideBarIndex: value });
  },

  onLoad(event) {

    let businessId = event.businessId
    this.refresh(businessId)
    this.init()
  },
  onShow() {
    this.init()
  },

  async refresh(businessId) {
    req.get("/business/" + businessId).then(
      (res) => {
        let result = res.data;
        this.setData({
          tittle: result.businessName,
          businessDetial: result.businessDesc
        })
      }
    )
    req.get("/category/list?type=1&businessId=" + businessId).then(
      (res) => {
        this.setData({
          categories: []
        })
        let dataValues = res.data
        for (let i = 0; i < dataValues.length; i++) {
          this.data.categories.push({
            label: dataValues[i].name,
            title: dataValues[i].name,
            cid: dataValues[i].id,
            items: []
          })
        }
        console.log("aasd", this.data.categories)
        this.setData({
          categories: this.data.categories
        })
      }
    )
    req.get("/dish/lists?businessId=" + businessId).then(
      (res) => {
        let dataValues = Array.from(res.data);
        for (let i = 0; i < dataValues.length; i++) {
          let dataValue = dataValues[i];
          let dataEasy = {
            id: dataValue.id,
            image: dataValue.image,
            name: dataValue.name,
          }
          this.data.categories.forEach(
            (category) => {
              console.log(category.cid, dataValue.categoryId)
              if (category.cid == dataValue.categoryId) {
                category.items.push(dataEasy)
              }
            }
          )
          this.setData({
            categories: this.data.categories
          })
        }
      }
    )
  },

  navToDetail(e) {
    // const { index } = e;
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/goods/myGoods/myGoods?id=" + id,
    });
  },

  switchToCart() {
    wx.switchTab({
      url: '/pages/myCart/myCart',
    })
  },

  init() {
    req.get("/shoppingCart/list").then(
      (res) => {
        let dataValue = res.data;
        this.setData({
          dishList: dataValue
        });
        this.calcMoney();
      }
    )
  },
  calcMoney() {
    let money = 0;
    for (let i = 1; i < this.data.dishList.length; i++) {
      money += this.data.dishList[i].number * this.data.dishList[i].amount;
    }
    this.setData({
      money: money
    })
  }


});

