import { request } from '@/plugins/request.js'

const getArticles = (params)=>{
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

const addFavourite = (slug)=>{
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}
const deleteFavourite = (slug)=>{
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

// 获取文章详情
const getArticleDetail = (slug)=>{
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 获取文章评论
const getArticleComments = (slug)=>{
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}
export {
    getArticles,
    addFavourite,
    deleteFavourite, 
    getArticleDetail,
    getArticleComments
}