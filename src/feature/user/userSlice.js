import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import * as STORAGE from '../../constant/storage';

//action async
export const signInAct = createAsyncThunk(
	'user/sign-in',
	async (params, thunkAPI) => {
		try {
			const signInResult = await userApi.signIn(params);

			const {success, mess, token, refreshToken, expired_at} = signInResult;
			//success = true => login true
			if (success) {
				localStorage.setItem(STORAGE.ACCESS_TOKEN, token);
				localStorage.setItem(STORAGE.REFRESH_TOKEN, refreshToken);
				localStorage.setItem(STORAGE.EXPIRED_AT, expired_at);
			}

			return {success, mess};
		} catch (error) {
			console.log('Error in userSlice:', error);
		}
	}
);

export const getInfoAct = createAsyncThunk(
	'user/info',
	async (params, thunkAPI) => {
		try {
			const checkToken = localStorage.getItem(STORAGE.ACCESS_TOKEN);
			if (checkToken) {
				const userResult = await userApi.getInfo();
				return userResult;
			}
		} catch (error) {
			console.log('Error in userSlice:', error);
		}
	}
);

export const uploadPhoto = createAsyncThunk(
	'user/upload',
	async (params, thunkAPI) => {
		try {
			const formData = new FormData();

			formData.append('title', params.title);
			formData.append('desc', params.desc);
			formData.append('img', params.img);

			const uploadResult = await userApi.uploadPhoto(formData);

			return uploadResult;
		} catch (error) {
			console.log('Error in userSlice:', error);
		}
	}
);

const authSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: {},
	},
	reducers: {
		//for actions sync
		signOut: (state) => {
			localStorage.removeItem(STORAGE.ACCESS_TOKEN);
			localStorage.removeItem(STORAGE.REFRESH_TOKEN);
			localStorage.removeItem(STORAGE.EXPIRED_AT);

			state.currentUser = {};
		},
	},
	extraReducers: {
		//for actions async
		//return action for login page
		[signInAct.fulfilled]: (_, action) => action.payload,
		//update state and return to page need currentUser
		[getInfoAct.fulfilled]: (state, action) => {
			state.currentUser = action.payload || {};
		},
		[getInfoAct.rejected]: (state) => {
			state.currentUser = {};
		},
		//return action for upload page
		[uploadPhoto.fulfilled]: (_, action) => action.payload,
	},
});

const {reducer: userReducer, actions} = authSlice;
export const {signOut} = actions;
export default userReducer;
