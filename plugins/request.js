import axios from 'axios'

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})
// 插件的默认导出
export default (context) => {
    // console.log('context', context)
    //  context: query params 
    // 添加请求拦截器
    let { store } = context

    request.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        const { user } = store.state
        // console.log(config ,'config')
        if (user && user.token) {
            config.headers.Authorization = `Token ${store.state.user.token}`
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
}

// 响应拦截器