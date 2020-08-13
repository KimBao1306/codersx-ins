import React from 'react';
import PropTypes from 'prop-types';
// import {FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import {ErrorMessage} from 'formik';
import cls from 'classnames';
import './InputField.scss';
import ErrorField from '../ErrorField';
InputField.propTypes = {
	//các props từ thằng FastField cung cấp
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	//các props tự thêm của mình
	type: PropTypes.string,
	label: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
};

InputField.defaultProps = {
	type: 'text',
	label: '',
	disabled: false,
	placeholder: '',
};

function InputField(props) {
	const {field, form, label, type, disabled, placeholder} = props;
	const {name} = field;
	const {errors, touched} = form;
	const showError = errors[name] && touched[name];

	return (
		<div className="form-group">
			{label && (
				<label htmlFor={name} className="form-label">
					{label}
				</label>
			)}
			<input
				{...field}
				type={type}
				id={name}
				disabled={disabled}
				placeholder={placeholder}
				className={cls('form-control', {'in-valid': showError})}
			/>
			<ErrorMessage name={name} component={ErrorField} />
		</div>
	);
}

export default InputField;
