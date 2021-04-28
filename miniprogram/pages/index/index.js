//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: '../../images/user/user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  onLoad: function() {
    this.addListener()
  },
  onShow: function() {
    this.setData({
      userInfo: app.globalData.userInfo || {}
    })
  },

  // 注册页
  signUp() {
    wx.navigateTo({
      url: '../login/login'
    })
  },

  // 页面进入等待信息同步五秒
  addListener() {
    let num = 0
    const timer = setInterval(() => {
      num++
      if (app.globalData.userInfo || num === 10) {
        this.setData({
          userInfo: app.globalData.userInfo || {}
        })
        clearInterval(timer)
      }
    }, 500)
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
