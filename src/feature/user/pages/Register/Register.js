import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			psw: '',
			redirect: false,
		};
	}

	getInfo = (event) => {
		this.setState({
			...this.state,
			[event.target.getAttribute('name')]: event.target.value,
		});
	};

	onRegister = async () => {
		const {name, email, psw} = this.state;

		if (!name || !email || !psw || psw.length < 8) {
			alert('Lỗi....');
		}

		const data = await axios.post(
			'https://react-b28-api-instagram.glitch.me/auth/register',
			{
				name,
				email,
				psw,
			}
		);

		const {success, mess} = data.data;

		if (!success) {
			alert(mess);
			return;
		}

		alert(mess);

		this.setState({
			name: '',
			email: '',
			psw: '',
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
					<h3 className="text-center font-size-">Register</h3>
				</div>
				<FormGroup>
					<Label for="name">Name</Label>
					<Input
						type="text"
						name="name"
						id="name"
						placeholder="Your name"
						onChange={this.getInfo}
					/>
				</FormGroup>
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
				<FormGroup>
					<Label for="psw">Password</Label>
					<Input
						type="password"
						name="psw"
						id="psw"
						placeholder="Your password"
						onChange={this.getInfo}
					/>
				</FormGroup>
				<Button onClick={this.onRegister}>Submit</Button>
			</Form>
		);
	}
}
