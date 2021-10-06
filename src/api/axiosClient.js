import axios from 'axios';
import queryString from 'query-string';
import * as STORAGE from '../constant/storage';
import userApi from './userApi';
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

	if (token) {
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
	async (error) => {
		// Handle errors

		//tạo 1 biến khi có 1 request refresh token thì các request khác sẽ đợi
		let handleRefreshToken = null;
		//lấy config từ response trả về
		const originalRequest = error.config;

		if (error.response.status === 401) {
			const rfToken = localStorage.getItem(STORAGE.REFRESH_TOKEN);

			// kiểm tra thử xem đã có req refresh token chưa
			handleRefreshToken = handleRefreshToken
				? handleRefreshToken
				: userApi.refreshToken({rfToken});

			const {newAccessToken} = await handleRefreshToken;

			localStorage.setItem(STORAGE.ACCESS_TOKEN, newAccessToken);

			handleRefreshToken = null;
			//thiết lập lại header từ config trả về
			originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
				STORAGE.ACCESS_TOKEN
			)}`;

			return axiosClient(originalRequest);
		}
		throw error;
	}
);

export default axiosClient;
