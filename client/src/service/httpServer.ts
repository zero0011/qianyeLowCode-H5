import axios from 'axios';
import { Cookie } from '@/utils/cookie';
import { errorMessage } from '@/utils';
import QS from 'qs';
import store from '@/redux/store';
import { baseURL } from '@/config';

// 环境的切换
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = baseURL;
} else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'https://www.production.com';
}

axios.defaults.headers['Content-Type'] = 'application/json;charse=UTF-8'
axios.defaults.timeout = 30000; // 超时时间

// 请求拦截器
axios.interceptors.request.use(config => {
	// 重新获取最新state
	const stateToStore = store.getState();
	const access_token = stateToStore.user.access_token;
	config.headers.Authorization = access_token ? `Bearer ${access_token}` : '';
	config.headers['x-csrf-token'] = Cookie.get('x-csrf-token');
	return config
}, error => {
	return Promise.reject(error)
});

// 响应拦截器
axios.interceptors.response.use(
	response => {
		if (response.data.status) {
			return Promise.resolve(response);
		} else {
			errorMessage(response.data.message || response.data.msg || response.data.errMsg);
			return Promise.reject(response);
		}
	},
	err => {
		if (err.response.status) {
			switch (err.response.status) {
				case 400:
					err.message = '错误请求';
					break;
				case 401:
					// 401: 未登录
					err.message = '未授权，请重新登录';
					// TODO: 跳转登录页面
					break;
				case 403:
					// 403 token过期 forbidden               
					err.message = '没有访问权限，拒绝访问';
					break;
				case 404:
					// 404请求不存在
					err.message = '网络请求不存在';
					break;
				case 405:
					err.message = '请求方法未允许';
					break;
				case 408:
					err.message = '请求超时';
					break;
				case 500:
					err.message = err.response.data.message;
					break;
				case 501:
					err.message = '网络未实现';
					break;
				case 502:
					err.message = '网络错误';
					break;
				case 503:
					err.message = '服务不可用';
					break;
				case 504:
					err.message = '网络超时';
					break;
				default:
					// 其他错误，直接抛出错误提示
					err.message = `连接错误${err.response.msg}`
			}
		} else {
			err.message = "连接到服务器失败"
		}
		errorMessage(err.message || err.response.msg);
		return Promise.reject(err.response);
	}
);

/**
 * 下载文件
 */
let downloadFile = (url: string) => {
	window.open(url)
};

interface ResType {
	body: Object
	code: number
	msg: string
	status: number
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params?: any): Promise<ResType> {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params || {}
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	})
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url: string, params: any): Promise<ResType> {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

export function postFormData(url: string, params: any): Promise<ResType> {
	return new Promise((resolve, reject) => {
		const data = QS.stringify(params) || {};
		axios.post(url, data, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err.data)
			})
	})
}

export function put(url: string, params: any): Promise<ResType> {
	return new Promise((resolve, reject) => {
		axios.put(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	})
}

export function deleteRequest(url: string, params: any): Promise<ResType> {
	return new Promise((resolve, reject) => {
		axios.delete(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	})
}

// 下载文件
export function getFile(url: string, params: any) {
	let tempParams = {
		...(params || {})
	}
	// 拼接下载地址
	let list = [];
	for (let key in tempParams) {
		list.push(key.toString() + '=' + tempParams[key]);
	}
	url = baseURL + url + '?' + list.join('&');
	url = encodeURI(url);
	downloadFile(url);
}