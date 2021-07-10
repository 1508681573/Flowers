import axios from 'axios'
import QS from 'qs';  // 引入qs模块，用来序列化post类型的数据
import store from '../store/index'
//创建axios的一个实例 
var instance = axios.create({
    baseURL: 'http://1.117.164.244:3000/',//接口统一域名
    timeout: 6000                         //设置超时
})

// instance.setRequestHeader("Authorization", "Bearer "+token);

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';  //post请求头

//------------------- 一、请求拦截器 
instance.interceptors.request.use(config => {
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    const token = store.state.token;
    token && (config.headers.Authorization = token);  //判断是否存在token，如果存在的话，则每个http header都加上token
    return config;
},
error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//----------------- 二、响应拦截器 
instance.interceptors.response.use(response => {

    return response.data;
},(error) => {
    // 用户没权限，或token过期
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                store.commit("SET_TOKEN",'');
                router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
    }
    // 返回接口返回的错误信息
    return Promise.reject(error.response);
});


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        instance.get(url, {            
            params: params
        }).then(res => {
            resolve(res);
        }).catch(err =>{
            reject(err)
    })    
});}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function post(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, QS.stringify(params))
        .then(res => {
            resolve(res);
        })
        .catch(err =>{
            reject(err)
        })
    });
}
