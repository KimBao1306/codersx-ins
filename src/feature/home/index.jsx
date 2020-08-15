import photoApi from 'api/photoApi';
import {alertAuth} from 'components/Alert';
import Banner from 'components/Banner';
import Header from 'components/Header';
import PhotoList from 'feature/user/components/PhotoList';
import {getInfoAct, signOut} from 'feature/user/userSlice';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function Home(props) {
	//get infomation user
	const userInfo = useSelector((state) => state.user.currentUser);
	//get photo list in serer
	const [photoList, setPhotoList] = useState([]);
	const [userList, setUserList] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const getAlbum = async () => {
			const res = await photoApi.getAll('/home');

			const {success, mess, data} = res;
			const {photoList, userList} = data;
			if (!success) {
				alert(mess);
				return;
			}
			setPhotoList(photoList);
			setUserList(userList);
			dispatch(getInfoAct());
		};

		getAlbum();
	}, [dispatch]);

	const signOutHandle = () => {
		dispatch(signOut());
		alertAuth.success('Logout Success', 'Bạn đã đăng xuất thành công.');
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
