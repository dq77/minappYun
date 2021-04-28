// miniprogram/pages/login/login.js
import userUtil from '../../utils/user'
import userServer from '../../server/user'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userUtil.getUserInfo().then(res => {
      app.globalData.userInfo = res
    })
  },

  // 注册流程
  signUp() {
    if (app.globalData.userInfo) {
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1000
      }).then(() => {
        setTimeout(() => { wx.navigateBack() }, 1000)
      })
    } else {
      // 调用授权弹窗，获取用户公开信息
      wx.getUserProfile({
        desc: '展示用户信息' // 用途，展示在弹窗中，谨慎填写
      }).then(res => {
        const app = getApp()
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo = res.userInfo
        userServer.addUser(res.userInfo).then(res => {
          if (res) {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 1000
            }).then(() => {
              setTimeout(() => { wx.navigateBack() }, 1000)
            })
          }
        })
      })
    }
  },
})