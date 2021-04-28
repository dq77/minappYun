const userServer = {}

// 查询单个用户
userServer.getUser = (openid) => {
  return new Promise((resolve, reject) => {
    const userDb = wx.cloud.database().collection('user')
    userDb.where({ openid }).get({
      success: res => {
        resolve(res.data[0])
      },
      fail: err => {
        reject(err)
        console.error('查询单个用户失败：', err)
      }
    })
  })
}

// 用户注册
userServer.addUser = (data) => {
  return new Promise((resolve, reject) => {
    const userDb = wx.cloud.database().collection('user')
    userDb.add({
      data: {
        openid: wx.getStorageSync('openid'),
        ...data
      },
      success: () => {
        resolve(true)
      },
      fail: err => {
        reject(err)
        console.error('用户注册失败：', err)
      }
    })
  })
}

export default userServer