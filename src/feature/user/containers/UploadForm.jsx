import Loading from 'components/Loading';
import InputField from 'feature/user/components/InputField';
import {FastField, Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import FileField from 'feature/user/components/FileField';

UploadForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

function UploadForm({onSubmit}) {
	const initialValues = {
		title: '',
		desc: '',
		img: null,
	};
	const validateSchema = Yup.object().shape({
		title: Yup.string().required('This Title is requied.'),
		desc: Yup.string().required('This Description is requied.'),
		img: Yup.mixed()
			.required('A image is required')
			.test(
				'fileSize',
				'Image too large',
				(value) => value && value.size <= 1024 * 160
			)
			.test(
				'fileFormat',
				'Unsupported Format',
				(value) =>
					value &&
					['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
						value.type
					)
			),
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
							name="title"
							component={InputField}
							label="Title"
							placeholder="Add a Title for photo"
						/>
						<FastField
							name="desc"
							component={InputField}
							label="Description"
							placeholder="Add a Description for photo"
						/>
						<FastField name="img" component={FileField} label="Your photo" />
						<button type="submit" className="btn btn-primary btn-hover">
							Upload
						</button>
						{isSubmitting && <Loading />}
					</Form>
				);
			}}
		</Formik>
	);
}

export default UploadForm;
