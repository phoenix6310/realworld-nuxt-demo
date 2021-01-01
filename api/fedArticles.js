import { request } from '@/plugins/request.js'

export const getFedArticles = (params)=> {
    return  request({
        method: 'GET',
        url: '/api/articles/feed',
        params
    })
}