import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ErrorMessage} from 'formik';
import cls from 'classnames';
import ErrorField from '../ErrorField';

FileField.propTypes = {
	//các props từ thằng FastField cung cấp
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	//các props tự thêm của mình
	label: PropTypes.string,
	disabled: PropTypes.bool,
};

FileField.defaultProps = {
	label: '',
	disabled: false,
};

function FileField(props) {
	const [previewFileUrl, setPreviewFileUrl] = useState(null);

	const {field, form, label, disabled} = props;
	const {name} = field;
	const {errors, touched} = form;
	const showError = errors[name] && touched[name];

	function handleChangePhoto(e) {
		const reader = new FileReader();

		const getFile = e.target.files[0];

		if (getFile) {
			reader.onloadend = (values) => {
				setPreviewFileUrl(reader.result);
				form.setFieldValue(name, getFile);
			};
			reader.readAsDataURL(getFile);
		}
	}

	return (
		<div className="form-group">
			{label && (
				<label htmlFor={name} className="form-label">
					{label}
				</label>
			)}
			<input
				type="file"
				name={name}
				id={name}
				disabled={disabled}
				onChange={handleChangePhoto}
				className={cls('form-control', {'in-valid': showError})}
			/>
			{previewFileUrl && (
				<img
					className="form-image"
					src={previewFileUrl}
					alt="preview url"
					onError={() =>
						setPreviewFileUrl(
							'https://img.wallpapersafari.com/desktop/1920/1080/34/82/YRzXPk.jpeg'
						)
					}
				/>
			)}
			<ErrorMessage name={name} component={ErrorField} />
		</div>
	);
}

export default FileField;
