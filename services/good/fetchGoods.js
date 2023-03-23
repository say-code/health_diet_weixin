import { config } from '../../config/index';
const req = require('../../utils/request');
const app = getApp()

/** 获取商品列表 */
async function mockFetchGoodsList(pageIndex = 1, pageSize = 20, ins = 1) {
  const { delay } = require('../_utils/delay');
  const { getGoodsList } = require('../../model/goods');
  // return delay().then(() =>
  //   getGoodsList(pageIndex, pageSize).map((item) => {
  //     return {
  //       spuId: item.spuId,
  //       thumb: item.primaryImage,
  //       title: item.title,
  //       price: item.minSalePrice,
  //       originPrice: item.maxLinePrice,
  //       tags: item.spuTagList.map((tag) => tag.title),
  //     };
  //   }),
  // );
  let goods;
  console.log(ins)
  const res = await req.get("/dish/page", { data: { pageSize: pageSize, page: pageIndex, type: ins } });
  goods = res.data.records.map((item) => {
    return {
      spuId: item.id,
      thumb: app.globalData.apiHost + "//common/download?name=" + item.image,
      title: item.name,
      price: item.price,
      business: item.businessName,
      description: item.description,
      businessId: item.businessId
    };
  });
  console.log(goods);
  return goods;

}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex = 1, pageSize = 20, ins) {
  if (config.useMock) {
    // console.log(mockFetchGoodsList(pageIndex, pageSize))
    return mockFetchGoodsList(pageIndex, pageSize, ins);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
