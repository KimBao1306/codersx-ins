import {unwrapResult} from '@reduxjs/toolkit';
import {alertAuth} from 'components/Alert';
import Logo from 'components/Logo';
import AsideBanner from 'feature/user/components/AsideBanner';
import LoginForm from 'feature/user/containers/LoginForm';
import {getInfoAct, signInAct} from 'feature/user/userSlice';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './Login.scss';

function Login() {
	const dispatch = useDispatch();
	const history = useHistory();

	async function handleSubmit(values) {
		try {
			const signInResult = await dispatch(signInAct(values));
			const {success, mess} = unwrapResult(signInResult);

			if (!success) {
				alertAuth.fail('Login Failed', mess);
				return;
			}

			alertAuth.success('Login Successful', mess);

			const userResult = await dispatch(getInfoAct());
			unwrapResult(userResult);

			history.push('/');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="form">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4">
						<AsideBanner />
					</div>
					<div className="col-sm-12 col-md-12 col-lg-8">
						<div className="form__inner">
							<Logo fontWeight="600" fontSize="3.2rem" />
							<h3 className="form__heading">Sign in to Library</h3>
							<LoginForm onSubmit={handleSubmit} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
