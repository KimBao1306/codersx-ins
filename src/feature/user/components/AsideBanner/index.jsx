import React from 'react';
import PropTypes from 'prop-types';
import './AsideBanner.scss';
import Logo from 'components/Logo';

AsideBanner.propTypes = {
	src: PropTypes.string,
	background: PropTypes.string,
	color: PropTypes.string,
};

AsideBanner.defaultProps = {
	src:
		'https://static.dribbble.com/users/3289568/screenshots/6446572/attachments/1379380/250fa021-25fa-405c-9608-9912ff1982fe.png',
	background: '#f1cdd7',
	color: '#865c6c',
};

function AsideBanner({src, background, color}) {
	return (
		<div className="aside-banner" style={{backgroundColor: background}}>
			<div className="aside-banner__content">
				<Logo color={color} fontWeight="400" fontSize="3.2rem" />
				<div className="aside-banner__title" style={{color: color}}>
					Discover the world.
				</div>
			</div>
			<img src={src} alt="banner for auth" className="aside-banner__image" />
		</div>
	);
}

export default AsideBanner;
