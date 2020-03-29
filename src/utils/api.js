import http from './request.js'

const api = {
    //登录
    login(data = {}) {
        return http.request('/user/login', data,'post');
    },
}

export default api
