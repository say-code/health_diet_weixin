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
      {
        label: '健康',
        title: '健康',
        badgeProps: {},
        items: [],
      },
      {
        label: '三高',
        title: '三高',
        badgeProps: {
          // dot: true,
        },
        items: [],
      },
      {
        label: '减脂',
        title: '减脂',
        badgeProps: {},
        items: [],
      },
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
  },

  async refresh(businessId) {
    await req.get("/business/" + businessId).then(
      (res) => {
        let result = res.data;
        this.setData({
          tittle: result.businessName,
          businessDetial: result.businessDesc
        })
      }
    )
    await req.get("/dish/lists?businessId=" + businessId).then(
      (res) => {
        let dataValues = Array.from(res.data);
        for (let i = 0; i < dataValues.length; i++) {
          let dataValue = dataValues[i];
          let dataEasy = {
            id: dataValue.id,
            image: dataValue.image,
            name: dataValue.name
          }
          switch (dataValue.mealType) {
            case "1": this.data.categories[0].items.push(dataEasy); break;
            case "2": this.data.categories[1].items.push(dataEasy); break;
            case "3": this.data.categories[2].items.push(dataEasy); break;

          }
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
      url: '/pages/cart/index',
    })
  }

});

