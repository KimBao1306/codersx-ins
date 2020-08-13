import React from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';

Loading.propTypes = {
	color: PropTypes.string,
};

Loading.defaultProps = {
	color: '#000',
};

function Loading(props) {
	const {color} = props;
	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				backgroundColor: 'rgba(255,2555,255, .5)',
				position: 'fixed',
				top: 0,
				left: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ClipLoader size={150} color={color} loading={true} />
		</div>
	);
}

export default Loading;
