import React from 'react';
import PropTypes from 'prop-types';
import './ErrorField.scss';

ErrorField.propTypes = {
	errValue: PropTypes.object,
};

ErrorField.defultProps = {
	errValue: {},
};

function ErrorField(props) {
	return <div className="error-field">{props.children}</div>;
}

export default ErrorField;
