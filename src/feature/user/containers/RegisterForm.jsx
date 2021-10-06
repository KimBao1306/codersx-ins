import Loading from 'components/Loading';
import InputField from 'feature/user/components/InputField';
import {FastField, Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';
import * as Yup from 'yup';

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

function LoginForm({onSubmit}) {
	const initialValues = {
		name: '',
		usn: '',
		psw: '',
	};
	const validateSchema = Yup.object().shape({
		usn: Yup.string()
			.min(8, 'Your username too short! At least 8 letters')
			.max(20, 'Your username too long!')
			.required('This username is requied.'),
		psw: Yup.string()
			.min(8, 'Your password too short! At least 8 letters')
			.required('This password is requied.'),
	});
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validateSchema}
		>
			{(formikProps) => {
				const {isSubmitting} = formikProps;
				return (
					<Form>
						<FastField
							name="usn"
							component={InputField}
							label="Username"
							placeholder="Your username"
						/>
						<FastField
							name="psw"
							component={InputField}
							type="password"
							label="Password"
							placeholder="Your password"
							autocomplete="on"
						/>

						<NavLink
							to="/auth/forgot"
							style={{
								display: 'block',
								textAlign: 'right',
								fontSize: '1.4rem',
								color: '#4f3cc9',
							}}
						>
							Forgot password?
						</NavLink>
						<button type="submit" className="btn btn-primary btn-hover">
							Login
						</button>
						{isSubmitting && <Loading />}
					</Form>
				);
			}}
		</Formik>
	);
}

export default LoginForm;
