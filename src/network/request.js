import axios from 'axios';

export default function request(config) {
	// 1.创建一个axios实例
	const instance = axios.create({
		baseURL: 'http://152.136.185.210:8000/api/w6',
		timeout: 5000
	})

	// 2.拦截器使用
	// 响应拦截
	instance.interceptors.response.use(res => {
		return res
	},err => {
		throw new Error(err)
	})

	// 3.返回实例（等同于返回一个Promise实例）
	return instance(config)
}