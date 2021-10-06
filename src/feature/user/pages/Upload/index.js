import {unwrapResult} from '@reduxjs/toolkit';
import Logo from 'components/Logo';
import AsideBanner from 'feature/user/components/AsideBanner';
import UploadForm from 'feature/user/containers/UploadForm';
import {uploadPhoto} from 'feature/user/userSlice';
import React from 'react';
import {useDispatch} from 'react-redux';
import {alertAuth} from 'components/Alert';
import {useHistory} from 'react-router-dom';

function Upload() {
	const dispatch = useDispatch();
	const history = useHistory();

	async function handleSubmit(values) {
		try {
			const uploadRs = await dispatch(uploadPhoto(values));
			const {success, mess} = unwrapResult(uploadRs);

			if (success) {
				alertAuth.success('Upload Success', mess);
				history.push('/');
			} else {
				alertAuth.fail('Upload Failed', mess);
			}
		} catch (error) {
			console.log('Upload Error', error);
		}
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
							<UploadForm onSubmit={handleSubmit} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Upload;
