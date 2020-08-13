import axios from 'axios';
import queryString from 'query-string';
import * as STORAGE from '../constant/storage';
/**
 * khởi tạo một axios theo ý muốn của chúng ta.
 * tự định nghĩa các cấu hình bên trong
 * baseURL: đường dẫn chúng đến api
 * headers: thêm các headers yêu cầu từ api
 * paramsSerializer: chúng ta sẽ dùng query-string để biến đổi params được truyền vào axios để gắn vào baseURL và gửi lên server.
 */
const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {'content-type': 'application/json'},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	// Handle token here ...

	const token = localStorage.getItem(STORAGE.ACCESS_TOKEN) || '';
	const expired_at = localStorage.getItem(STORAGE.EXPIRED_AT) || 0;
	const checkExpired = expired_at - Date.now() / 1000;

	if (token && checkExpired > 0) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	}
);

export default axiosClient;
