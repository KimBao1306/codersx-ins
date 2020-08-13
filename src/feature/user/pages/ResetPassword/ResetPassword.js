import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class ResetPassword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			redirect: false,
		};
	}

	getInfo = (event) => {
		this.setState({
			...this.state,
			[event.target.getAttribute('name')]: event.target.value,
		});
	};

	onResetPassword = async () => {
		const {email} = this.state;

		if (!email) {
			alert('Lỗi....');
		}

		const data = await axios.post(
			'https://react-b28-api-instagram.glitch.me/auth/reset',
			{
				email,
			}
		);

		const {success, mess} = data.data;

		if (!success) {
			alert(mess);
			return;
		}

		alert(mess);

		this.setState({
			email: '',
			redirect: true,
		});
	};

	render() {
		const {redirect} = this.state;

		if (redirect) {
			return <Redirect to="/login" />;
		}

		return (
			<Form>
				<div className="mb-4">
					<h3 className="text-center font-size-">Reset Password</h3>
				</div>
				<FormGroup>
					<Label for="email">Email</Label>
					<Input
						type="email"
						name="email"
						id="email"
						placeholder="Your email"
						onChange={this.getInfo}
					/>
				</FormGroup>
				<Button onClick={this.onResetPassword}>Submit</Button>
			</Form>
		);
	}
}
