// 		this.state = {
// 			file: null,
// 			url: '',
// 			redirect: false,
// 		};
// 	}

// 	onUpload = async (e) => {
// 		const {file} = this.state;
// 		const {token} = this.props;

// 		const formData = new FormData();

// 		formData.append('img', file);

// 		const data = await axios.post(
// 			'https://react-b28-api-instagram.glitch.me/user/upload',
// 			formData,
// 			{
// 				headers: {
// 					'content-type': 'multipart/form-data',
// 					token,
// 				},
// 			}
// 		);

// 		const {success, mess} = data.data;

// 		if (!success) {
// 			alert(mess);
// 			return;
// 		}

// 		alert(mess);

// 		this.setState({file: null, url: '', redirect: true});
// 	};

// 	onGetFile = (e) => {
// 		const file = e.target.files[0];

// 		const reader = new FileReader();

// 		reader.onload = () => this.setState({file, url: reader.result});

// 		reader.readAsDataURL(file);
// 	};
import React from 'react';
import AsideBanner from 'feature/user/components/AsideBanner';
import Logo from 'components/Logo';
import UploadForm from 'feature/user/containers/UploadForm';
import userApi from 'api/userApi';
import {useDispatch} from 'react-redux';
import {uploadPhoto} from 'feature/user/userSlice';
import {unwrapResult} from '@reduxjs/toolkit';

function Upload() {
	const dispatch = useDispatch();

	async function handeSubmit(values) {
		const uploadRs = await dispatch(uploadPhoto(values));
		console.log(unwrapResult(uploadRs));
	}

	return (
		<div className="form">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4">
						<AsideBanner
							src="https://static.dribbble.com/users/3281732/screenshots/14012664/media/bf04ac321c5b87c86879b6e714e6f562.jpeg"
							background="#F4C5BB"
						/>
					</div>
					<div className="col-sm-12 col-md-12 col-lg-8 ">
						<div className="form__inner">
							<Logo fontWeight="600" fontSize="3.2rem" />
							<h3 className="form__heading">Upload your photo</h3>
							<UploadForm onSubmit={handeSubmit} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Upload;
