import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
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

	onLogin = async () => {
		const {email, psw} = this.state;

		if (!email || !psw || psw.length < 8) {
			alert('Lỗi....');
		}

		const data = await axios.post(
			'https://react-b28-api-instagram.glitch.me/auth/login',
			{
				email,
				psw,
			}
		);

		const {success, mess, token} = data.data;

		if (!success) {
			alert(mess);
			return;
		}

		alert(mess);

		localStorage.setItem('access-token', token);

		this.setState({
			email: '',
			psw: '',
			redirect: true,
		});
	};

	render() {
		const {redirect} = this.state;
		const {reRenderAfterLogin} = this.props;

		if (redirect) {
			reRenderAfterLogin();
			return <Redirect to="/" />;
		}
		return (
			<Form>
				<div className="mb-4">
					<h3 className="text-center font-size-">Sign in</h3>
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
				<Button onClick={this.onLogin}>Submit</Button>
			</Form>
		);
	}
}
