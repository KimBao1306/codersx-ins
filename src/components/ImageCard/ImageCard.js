import React from 'react';
import PropTypes from 'prop-types';
import {Col, Card, CardImg} from 'reactstrap';

export default function ImageCard({src}) {
	return (
		<Col className="mb-4" lg={3} md={6}>
			<Card style={{height: '100%'}}>
				<CardImg
					top
					width="100%"
					height="100%"
					src={src}
					alt="Card image cap"
					style={{objectFit: 'cover'}}
				/>
			</Card>
		</Col>
	);
}

ImageCard.propTypes = {
	src: PropTypes.string.isRequired,
};
