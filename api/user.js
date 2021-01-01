import { request } from '@/plugins/request.js'

// 登录
const login = (data) => {
    return request({
        method: 'POST',
        url: '/api/users/login',
        data
    })
}

// 注册
const register = (data)=>{
    return request({
        method: 'POST',
        url: '/api/users',
        data
    })
}
const updateUser = (data) => {
    return request({
        method: 'PUT',
        url: '/api/user',
        data
    })
}
export {
    login,
    register,
    updateUser
}