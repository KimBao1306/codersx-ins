import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Logo(props) {
	return (
		<Link to="/">
			<img
				src={props.src}
				style={{width: '150px', marginRight: '20px'}}
				alt="logo codersx"
			/>
		</Link>
	);
}

Logo.propTypes = {
	src: PropTypes.string,
};

Logo.defaultProps = {
	src:
		'https://res.cloudinary.com/bao-codersx/image/upload/v1590471464/codersx2_cxdofo.png',
};
