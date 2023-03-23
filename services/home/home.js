import { config, cdnBase } from '../../config/index';

/** 获取首页数据 */
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        {
          text: '健康',
          key: 0,
        },
        {
          text: '减脂',
          key: 1,
        },
        {
          text: '三高',
          key: 2,
        },
        // {
        //   text: '人气榜',
        //   key: 3,
        // },
        // {
        //   text: '好评榜',
        //   key: 4,
        // },
        // {
        //   text: 'RTX 30',
        //   key: 5,
        // },
        // {
        //   text: '手机也疯狂',
        //   key: 6,
        // },
      ],
      activityImg: `${cdnBase}/activity/banner.png`,
    };
  });
}

/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    return mockFetchHome();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
