import axiosClient from './axiosClient';

const userApi = {
	signIn: (params) => {
		const url = '/auth/login';
		return axiosClient.post(url, {
			params,
		});
	},
	getInfo: (params) => {
		const url = '/user/info';
		return axiosClient.get(url, {params});
	},
};

export default userApi;
