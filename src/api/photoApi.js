import axiosClient from './axiosClient';

const photoApi = {
	getAll: (params) => {
		const url = '/home';
		return axiosClient.get(url, {params});
	},
};

export default photoApi;
