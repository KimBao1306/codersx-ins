import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import * as STORAGE from '../../constant/storage';

//action async
export const signInAct = createAsyncThunk('user/sign-in', async (params) => {
	const signInResult = await userApi.signIn(params);

	const {success, mess, accessToken, refreshToken} = signInResult;
	//success = true => login true
	if (success) {
		localStorage.setItem(STORAGE.ACCESS_TOKEN, accessToken);
		localStorage.setItem(STORAGE.REFRESH_TOKEN, refreshToken);
	}

	return {success, mess};
});

export const signOutAct = createAsyncThunk('user/sign-out', async (params) => {
	const signOutResult = await userApi.signOut(params);

	const {success, mess} = signOutResult;
	//success = true => logout true
	if (success) {
		localStorage.removeItem(STORAGE.ACCESS_TOKEN);
		localStorage.removeItem(STORAGE.REFRESH_TOKEN);
	}

	return {success, mess};
});

export const getInfoAct = createAsyncThunk('user/info', async () => {
	const checkToken = localStorage.getItem(STORAGE.ACCESS_TOKEN);
	if (checkToken) {
		const userResult = await userApi.getInfo();
		return userResult;
	}
});

export const uploadPhoto = createAsyncThunk('user/upload', async (params) => {
	const formData = new FormData();

	formData.append('title', params.title);
	formData.append('desc', params.desc);
	formData.append('img', params.img);

	const uploadResult = await userApi.uploadPhoto(formData);

	return uploadResult;
});

const authSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: {},
	},
	reducers: {
		//for actions sync
	},
	extraReducers: {
		//for actions async
		//return action for login page
		[signInAct.fulfilled]: (_, action) => action.payload,

		//return action for logout action
		[signOutAct.fulfilled]: (state, action) => {
			delete state.currentUser;
			return action.payload;
		},

		//update state and return to page need currentUser
		[getInfoAct.fulfilled]: (state, action) => {
			state.currentUser = (action.payload && action.payload.newUser) || {};
		},
		[getInfoAct.rejected]: (state) => {
			state.currentUser = {};
		},

		//return action for upload page
		[uploadPhoto.fulfilled]: (action) => action.payload,
	},
});

const {reducer: userReducer} = authSlice;
export default userReducer;
