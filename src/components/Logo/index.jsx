import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import './Logo.scss';
Logo.propTypes = {
	color: PropTypes.string,
	fontWeight: PropTypes.string,
};

Logo.defaultProps = {
	color: '#222831',
	fontWeight: '700',
};

export default function Logo({color, fontWeight}) {
	return (
		<div className="logo">
			<NavLink to="/" className="logo__link" style={{color, fontWeight}}>
				Library <span className="logo__text">Photo</span>
			</NavLink>
		</div>
	);
}
