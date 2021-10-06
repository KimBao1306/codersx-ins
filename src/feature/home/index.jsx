import {unwrapResult} from '@reduxjs/toolkit';
import photoApi from 'api/photoApi';
import {alertAuth} from 'components/Alert';
import Banner from 'components/Banner';
import Header from 'components/Header';
import PhotoList from 'feature/user/components/PhotoList';
import {getInfoAct, signOutAct} from 'feature/user/userSlice';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function Home(props) {
	//get infomation user
	const userInfo = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	//get photo list in server
	const [photoList, setPhotoList] = useState([]);
	const [userList, setUserList] = useState([]);

	useEffect(() => {
		const getAlbum = async () => {
			try {
				const res = await photoApi.getAll('/home');

				const {success, mess, data} = res;
				const {photoList, userList} = data;
				if (!success) {
					alert(mess);
					return;
				}

				const userResult = await dispatch(getInfoAct());
				unwrapResult(userResult);

				setPhotoList(photoList);
				setUserList(userList);
			} catch (error) {
				console.log('Error from Home Component', error);
			}
		};

		getAlbum();
	}, [dispatch]);

	const signOutHandle = async () => {
		try {
			const signOutRs = await dispatch(signOutAct());
			console.log(signOutRs);
			const {success, mess} = unwrapResult(signOutRs);
			if (success) alertAuth.success('Logout Success', mess);
		} catch (error) {
			console.log('Error from Home Component - Logout', error);
		}
	};

	return (
		<>
			<Header userInfo={userInfo} signOut={signOutHandle} />
			<Banner />
			<PhotoList photoList={photoList} userList={userList} />
		</>
	);
}

export default Home;
