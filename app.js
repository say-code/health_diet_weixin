import updateManager from './common/updateManager';

App({
  onLaunch: function () { },
  onShow: function () {
    updateManager();
  },
  globalData: {
    authToken: "",
    userInfo: null,
    // apiHost: 'https://saycode.top',
    apiHost: 'http://localhost:8080',
    cookie: '',
  }
});
