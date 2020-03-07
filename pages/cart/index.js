// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    list:wx.getStorageSync('goods')||[],
    allSelect:'',
    allPrice:''
  },
  //获取收货地址按钮
  handleshdz(){
    wx.chooseAddress({
      success:(res)=>{
        console.log(res)
        this.setData({
          address:{
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            userName: res.userName,
            telNumber: res.telNumber
          }
        })
        wx.setStorageSync('address', this.data.address)
      }
    })
  },
  //计算价格
  handelPrice(){
    let allPrice = 0
    this.data.list.forEach(v => {
      if(v.select){
        allPrice += v.goods_price * v.number
      }
    })
    this.setData({
      allPrice,
      list:this.data.list
    })
    wx.setStorageSync('goods',this.data.list)
  },
  handelNum(e){
    console.log(e)
    let { index, num } = e.currentTarget.dataset
    this.data.list[index].number += num
    this.handelPrice()
  },
  handelBlur(e){
    let {index} = e.currentTarget.dataset
    let {value}=e.detail
    this.data.list[index].number=+value
    this.handelPrice()
  },
  handelSelect(e){
    let { index } = e.currentTarget.dataset
    this.data.list[index].select = !this.data.list[index].select
    this.handelPrice()

    let allSelect = this.data.list.some(v => {
      return !v.select
    })
    allSelect = !allSelect
    this.setData({
      allSelect
    })
  },
  handelAllselect(){
    this.data.allSelect = !this.data.allSelect
    this.data.list.forEach(v=>{
      v.select = this.data.allSelect
    })
    this.handelPrice()
    this.setData({
      allSelect:this.data.allSelect
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'address',
      success:(res)=> {
        this.setData({
          address: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let arr = wx.getStorageSync('goods') || []
    let allSelect=this.data.list.some(v=>{
      return !v.select
    })
    allSelect = !allSelect
    this.setData({
      list:arr,
      allSelect
    })
    this.handelPrice()
  },  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})