import photoApi from 'api/photoApi';
import Banner from 'components/Banner';
import Header from 'components/Header';
import PhotoList from 'feature/photo/components/PhotoList';
import {getInfoAct, signOut} from 'feature/user/userSlice';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function Home(props) {
	//get infomation user
	const userInfo = useSelector((state) => state.user.current);
	//get photo list in serer
	const [photoList, setPhotoList] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const getAlbum = async () => {
			const data = await photoApi.getAll('/home');

			const {success, mess, photoList} = data;

			if (!success) {
				alert(mess);
				return;
			}
			setPhotoList(photoList);
			dispatch(getInfoAct());
		};

		getAlbum();
	}, [dispatch]);

	const signOutHandle = () => {
		dispatch(signOut());
	};

	return (
		<>
			<Header userInfo={userInfo} signOut={signOutHandle} />
			<Banner />
			<PhotoList photoList={photoList} />
		</>
	);
}

export default Home;
