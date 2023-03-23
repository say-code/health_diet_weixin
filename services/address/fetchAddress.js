import { config } from '../../config/index';
const req = require('../../utils/request');
const app = getApp()

/** 获取收货地址 */
function mockFetchDeliveryAddress(id) {
  const { delay } = require('../_utils/delay');
  const { genAddress } = require('../../model/address');

  return delay().then(() => genAddress(id));
}

/** 获取收货地址 */
export function fetchDeliveryAddress(id = 0) {
  if (config.useMock) {

    return mockFetchDeliveryAddress(id);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}

/** 获取收货地址列表 */
function mockFetchDeliveryAddressList(len = 0) {
  const { delay } = require('../_utils/delay');
  const { genAddressList } = require('../../model/address');

  return delay().then(() =>
    genAddressList(len).map((address) => {
      return {
        ...address,
        phoneNumber: address.phone,
        address: `${address.provinceName}${address.cityName}${address.districtName}${address.detailAddress}`,
        tag: address.addressTag,
      };
    }),
  );
}

/** 获取收货地址列表 */
export async function fetchDeliveryAddressList(len = 10) {
  if (config.useMock) {
    let data = []
    console.log(mockFetchDeliveryAddressList(len))
    req.get("/addressBook/list")
      .then((res) => {
        console.log(res.data)
        data = res.data
        return data
      })

    // return mockFetchDeliveryAddressList(len);
  }

}
