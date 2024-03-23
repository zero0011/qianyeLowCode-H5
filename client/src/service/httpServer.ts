import axios from 'axios';
import { Cookie } from '@/utils/cookie';
import QS from 'qs';

// 线上环境配置axios.defaults.baseURL，生产环境则用proxy代理
if (process.env.NODE_ENV !== 'development') {
	axios.defaults.baseURL = 'http://localhost:4000';
}
axios.defaults.headers['Content-Type'] = 'application/json;charse=UTF-8'
axios.defaults.timeout = 30000; // 超时时间

//请求拦截器
axios.interceptors.request.use(config => {
  
	config.headers.Authorization = store.getters.authorization;
	config.headers['x-csrf-token'] = Cookie.get('x-csrf-token');
	return config
}, error => {
	return Promise.reject(error)
});

