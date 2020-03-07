import request from '../../request/index.js'
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    bigList: [],
    current: 0,
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    request({
      url: '/goods/detail',
      data: {
        goods_id: options.goods_id
      }
    }).then(res => {
      console.log(res)
      let arr = res.data.message.pics.map(v => {
        return v.pics_big
      })
      this.setData({
        list: res.data.message,
        bigList: arr
      })

    })

    this.data.goods = wx.getStorageSync('goods') || []
    console.log(this.data.goods)
  },
  handelTab(e) {
    // console.log(e)
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },
  handelBig(e) {
    console.log(123)
    wx.previewImage({
      current: this.data.bigList[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: this.data.bigList // 需要预览的图片http链接列表
    })
  },

  handeladd() {
    let res = this.data.goods.some(v => {
      if (v.goods_id === this.data.list.goods_id) {
        v.number++
      }
      return v.goods_id === this.data.list.goods_id
    })
    if (!res) {
      this.data.goods.unshift({
        goods_id: this.data.list.goods_id,
        goods_name: this.data.list.goods_name,
        goods_price: this.data.list.goods_price,
        goods_small_logo: this.data.list.goods_small_logo,
        number: 1,
        select:true
      })
    }
    wx.setStorageSync('goods', this.data.goods)
    // console.log(this.data.goods)
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})