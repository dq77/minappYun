//app.js
import userUtil from './utils/user'
import config from './utils/config'
App({
  onLaunch: function () {
    this.globalData = {}
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      // 云函数初始化
      wx.cloud.init({ env: config.cloudEnv, traceUser: true }).then(() => {
        // 获取openid
        userUtil.getOpenid().then(res => {
          this.globalData.openid = res.openid
          userUtil.getUserInfo().then(res => {
            this.globalData.userInfo = res
          }, () => {
            // 数据库查不到 新用户
            wx.removeStorageSync('userInfo')
          })
        })
      })
    }
  }
})
