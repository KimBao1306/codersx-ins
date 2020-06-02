import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class Upload extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			file: null,
			url: '',
			redirect: false,
		};
	}

	onUpload = async (e) => {
		const {file} = this.state;
		const {token} = this.props;

		const formData = new FormData();

		formData.append('img', file);

		const data = await axios.post(
			'https://react-b28-api-instagram.glitch.me/user/upload',
			formData,
			{
				headers: {
					'content-type': 'multipart/form-data',
					token,
				},
			}
		);

		const {success, mess} = data.data;

		if (!success) {
			alert(mess);
			return;
		}

		alert(mess);

		this.setState({file: null, url: '', redirect: true});
	};

	onGetFile = (e) => {
		const file = e.target.files[0];

		const reader = new FileReader();

		reader.onload = () => this.setState({file, url: reader.result});

		reader.readAsDataURL(file);
	};

	render() {
		const {redirect, url} = this.state;

		if (redirect) {
			return <Redirect to="/album" />;
		}

		return (
			<Form>
				<div className="mb-4">
					<h3 className="text-center font-size-">Upload Image</h3>
				</div>
				<FormGroup>
					<Label for="email">Choose Your Image</Label>
					<Input
						type="file"
						name="img"
						id="image"
						placeholder="Your image"
						onChange={this.onGetFile}
					/>
				</FormGroup>
				{url && (
					<FormGroup className="text-center">
						<img src={url} style={{width: '300px'}} alt="album img" />
					</FormGroup>
				)}
				<Button onClick={this.onUpload}>Submit</Button>
			</Form>
		);
	}
}
