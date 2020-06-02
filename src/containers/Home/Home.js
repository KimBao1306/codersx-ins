import React from 'react';
import axios from 'axios';
import {Container, Row} from 'reactstrap';

import ImageCard from '../../components/ImageCard/ImageCard';

export default class Album extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userAlbum: [],
		};
	}

	componentDidMount() {
		const getAlbum = async () => {
			const data = await axios.get('https://react-b28-api-instagram.glitch.me/home');

			const {success, mess, userAlbum} = data.data;

			if (!success) {
				alert(mess);
				return;
			}

			this.setState({userAlbum});
		};
		getAlbum();
	}

	render() {
		const {userAlbum} = this.state;
		return (
			<Container>
				<Row>
					{userAlbum.map((img) => (
						<ImageCard {...img} key={img.id} />
					))}
				</Row>
			</Container>
		);
	}
}
