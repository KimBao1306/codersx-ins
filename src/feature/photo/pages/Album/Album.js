// import React from 'react';
// import axios from 'axios';
// import {Container, Row} from 'reactstrap';

// import ImageCard from '../../feature/photo/components/ImageCard/ImageCard';

// export default class Album extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			userAlbum: [],
// 		};
// 	}

// 	componentDidMount() {
// 		const getAlbum = async () => {
// 			const {token} = this.props;

// 			const data = await axios.get(
// 				'https://react-b28-api-instagram.glitch.me/user/album',
// 				{},
// 				{
// 					headers: {
// 						token,
// 					},
// 				}
// 			);

// 			const {success, mess, userAlbum} = data.data;

// 			if (!success) {
// 				alert(mess);
// 				return;
// 			}

// 			this.setState({userAlbum});
// 		};
// 		getAlbum();
// 	}

// 	render() {
// 		const {userAlbum} = this.state;
// 		return (
// 			<Container>
// 				<h3 className="text-center mb-3">My Images</h3>
// 				<Row>
// 					{userAlbum.map((img) => (
// 						<ImageCard {...img} key={img.id} />
// 					))}
// 				</Row>
// 			</Container>
// 		);
// 	}
// }
