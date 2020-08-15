import axiosClient from './axiosClient';

const userApi = {
	signIn: (params) => {
		const url = '/auth/login';
		return axiosClient.post(url, params);
	},
	getInfo: (params) => {
		const url = '/user/info';
		return axiosClient.get(url, params);
	},
	uploadPhoto: (params) => {
		const url = '/user/upload';

		return axiosClient.post(url, params, {
			headers: {'content-type': 'multipart/form-data'},
		});
	},
};

export default userApi;
