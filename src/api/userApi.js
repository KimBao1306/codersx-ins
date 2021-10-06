import axiosClient from './axiosClient';

const userApi = {
	signIn: (params) => {
		const url = '/auth/login';
		return axiosClient.post(url, params);
	},
	signOut: () => {
		const url = '/auth/logout';
		return axiosClient.post(url);
	},
	getInfo: () => {
		const url = '/user/info';
		return axiosClient.get(url);
	},
	uploadPhoto: (params) => {
		const url = '/user/upload';

		return axiosClient.post(url, params, {
			headers: {'content-type': 'multipart/form-data'},
		});
	},
	refreshToken: (params) => {
		const url = '/auth/refresh';
		return axiosClient.post(url, params);
	},
};

export default userApi;
