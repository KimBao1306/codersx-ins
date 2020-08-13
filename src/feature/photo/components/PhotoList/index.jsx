import {
	faBookmark,
	faComment,
	faHeart,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import './PhotoList.scss';

PhotoCard.propTypes = {
	photo: PropTypes.object,
};

PhotoCard.defaultProps = {
	photo: {},
};

export function PhotoCard({photo}) {
	const {src, idUser} = photo;
	return (
		<div className="photo__card col-sm-6 col-md-4 col-lg-3">
			<div className="photo-image">
				<a href="/" className="photo-image__link">
					<img src={src} alt="card" />
					<div className="photo-image__overplay">
						<p className="photo-image__title">Lorem ipsum dolor sit amet.</p>
						<span className="photo__icon">
							<FontAwesomeIcon icon={faBookmark} />
						</span>
						<span className="photo__icon">
							<FontAwesomeIcon icon={faHeart} />
						</span>
					</div>
				</a>
			</div>
			<div className="photo__info">
				<h3 className="photo__name">
					<a href="/">{idUser}</a>
				</h3>
				<span className="photo__icon">
					<FontAwesomeIcon icon={faComment} /> 5
				</span>
				<span className="photo__icon">
					<FontAwesomeIcon icon={faHeart} /> 95
				</span>
			</div>
		</div>
	);
}

PhotoList.propTypes = {
	photoList: PropTypes.array,
};

PhotoList.defaultProps = {
	photoList: [],
};

function PhotoList({photoList}) {
	return (
		<div className="photo">
			<div className="container">
				<div className="row photo__inner">
					{photoList.map((p) => (
						<PhotoCard photo={p} key={p._id} />
					))}
				</div>
			</div>
		</div>
	);
}

export default PhotoList;
