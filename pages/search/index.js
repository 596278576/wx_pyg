import request from '../../request/index.js'

// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    list: [],
    islodin: true,
    lastValue: '',
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let arr = wx.getStorageSync('history')
    if (!Array.isArray(arr)) {
      arr = []
    }
    this.setData({
      history: arr
    })
  },

  handelInput(e) {
    // console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
    this.getList()
  },
  getList() {
    if (this.data.islodin === true) {
      this.setData({
        islodin: false,
        lastValue: this.data.value
      })
      request({
        url: '/goods/qsearch',
        data: {
          query: this.data.value
        }
      }).then(res => {
        // console.log(res)
        this.setData({
          list: res.data.message,
          islodin: true
        })
        if (this.data.value !== this.data.lastValue) {
          this.getList()
        }
      })
    }
  },
  handelClear() {
    this.setData({
      value: '',
      list: []
    })
  },
  handelEnter() {
    let arr = this.data.history
    arr.unshift(this.data.value)
    arr=[...new Set(arr)]
    wx.setStorageSync('history', arr)
    wx.redirectTo({
      url: '/pages/goods_list/index?query=' + this.data.value
    })
  }
})