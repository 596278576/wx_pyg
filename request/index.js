const request =(config={})=>{
  if (config.url.search('/^http/')===-1){
    config.url = request.defaults.baseURL + config.url;
  }
  return new Promise((resolve, reject)=>{
        wx.request({
          ...config,
          success:(res)=>{
            resolve(res)
          },
          fail: (err) => {
            reject(err);
          },
          complete:(res)=>{
            request.errors(res)
          }
        })
    })
}
request.errors=()=>{}
request.onError=(callback)=>{
  if (typeof callback==="function"){
    request.errors = callback
  }
}
request.defaults = {
  // 基准路径
  baseURL: "https://api-hmugo-web.itheima.net/api/public/v1"
}


export default request