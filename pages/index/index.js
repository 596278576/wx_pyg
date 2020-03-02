//index.js
//获取应用实例
import request from '../../request/index.js'
Page({
  data: {
    banner: [],
    menus: [],
    floor:[]
  },

  onLoad: function () {
    this.getBanner()
    this.getMenus()
    this.getFloor()
  },

  //请求轮播图

  getBanner() {
    request({
      url: "/home/swiperdata"
    }).then((res) => {
      // console.log("测试request的请求：", res)
      this.setData({
        banner: res.data.message
      })
    })

    request.onError(res => {
      // 错误的拦截
      if (res.statusCode == 404) {
        console.log("出错了")
      }
    })
  },

  //请求菜单
  getMenus() {
    request({
      url: "/home/catitems"
    }).then((res) => {
      // console.log("测试request的请求：", res)
      let newData = res.data.message.map((v,i)=>{
        if(i===0){
          v.url ="/pages/category/index"
        }
        return v
      })

      this.setData({
        menus: newData
      })
    })
  },
  //请求楼层数据
  getFloor(){
    request({
      url: "/home/floordata"
    }).then(res=>{
      // console.log(res)
      this.setData({
        floor:res.data.message
      })
    })
  },
  //回到顶部
  toTop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
})