const userUtil = {}
import userServer from '../server/user'

// 获取openid
userUtil.getOpenid = () => {
  return new Promise((resolve, reject) => {
    if (wx.getStorageSync('openid')) {
      resolve(wx.getStorageSync('openid'))
    } else {
      // 调用云函数，获取openID
      wx.cloud.callFunction({
        name: 'login'
      }).then(res => {
        wx.setStorageSync('openid', res.result.openid)
        resolve(res.result)
      }).catch(err => {
        console.error('云函数login调用失败', err)
        reject(err)
      })
    }
  })
}

// 获取userInfo并保存 可以用自己的数据库
userUtil.getUserInfo = () => {
  return new Promise((resolve, reject) => {
    userServer.getUser(wx.getStorageSync('openid')).then(res => {
      if (res) {
        const app = getApp()
        wx.setStorageSync('userInfo', res)
        app.globalData.userInfo = res
        resolve(res)
      } else {
        // 新用户 数据库没有
        reject()
      }
    })
  })
}
export default userUtil