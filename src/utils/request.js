import axios from 'axios'
import Vue from 'vue'
import { config } from 'shelljs'

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:7999/travel'
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://www.zhangaishan.com.cn/wxApp'
}
axios.interceptors.request.use(config =>{
    console.log(config)
    //设置header参数（token）
    //config.headers.token = window.sessionStorage.getItem("token")
    return config
})

/**
 * request请求 同步请求
 * @param {*} url 请求路径
 * @param {*} data 请求参数
 * @param {*} method 请求方法
 */
function request(url, data = {}, method) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        })
            .then(res => {
                //成功
                resolve(res.data)
            })
            .catch(res => {
                //失败
                Vue.prototype.$message({
                    type: 'error',
                    message: '系统发生异常，请稍后再试',
                    duration: 3000,
                    showClose: true
                });
                reject(res)
            })
    })
}

/**
 * request请求 同步请求
 * @param {*} url 请求路径
 * @param {*} data 请求参数
 * @param {*} method 请求方法
 * @param {*} headers 请求头
 */
function requestPlus(url, data = {}, method, headers = {}) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: method,
            headers: headers,
            data: data
        })
            .then(res => {
                //成功
                resolve(res.data)
            })
            .catch(res => {
                //失败
                Vue.prototype.$message({
                    type: 'error',
                    message: '系统发生异常，请稍后再试',
                    duration: 3000,
                    showClose: true
                });
                reject(res)
            })
    })
}

export default {
    request: request,
    requestPlus: requestPlus
}