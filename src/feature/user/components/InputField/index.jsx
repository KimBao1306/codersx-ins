import React from 'react';
import PropTypes from 'prop-types';
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
	autocomplete: PropTypes.string,
};

InputField.defaultProps = {
	type: 'text',
	label: '',
	disabled: false,
	placeholder: '',
	autocomplete: 'off',
};

function InputField(props) {
	const {field, form, label, type, disabled, placeholder, autocomplete} = props;
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
				autoComplete={autocomplete}
				className={cls('form-control', {'in-valid': showError})}
			/>
			<ErrorMessage name={name} component={ErrorField} />
		</div>
	);
}

export default InputField;
