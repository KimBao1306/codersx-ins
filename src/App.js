import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import ResetPsw from './containers/ResetPassword/ResetPassword';
import Upload from './containers/Upload/Upload';
import Album from './containers/Album/Album';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLogin: false,
			token: '',
		};
	}

	reRenderAfterLogin = () => {
		this.setState({isLogin: true});
	};

	componentDidMount() {
		const getTokenLocal = localStorage.getItem('access-token') || '';
		if (getTokenLocal) {
			this.setState({isLogin: true, token: getTokenLocal});
		}
	}

	onLogout = () => {
		localStorage.removeItem('access-token');
		this.setState({isLogin: false});
		return <Redirect to="/" />;
	};

	render() {
		const {isLogin, token} = this.state;

		return (
			<div className="container-fluid">
				<Router>
					<Header isLogin={isLogin} />

					<div className="container">
						<Route path="/" exact component={() => <Home />} />
						{!isLogin && (
							<>
								<Route
									path="/login"
									exact
									component={() => (
										<Login reRenderAfterLogin={this.reRenderAfterLogin} />
									)}
								/>
								<Route path="/register" exact component={() => <Register />} />
								<Route path="/reset-psw" exact component={() => <ResetPsw />} />
							</>
						)}
						{isLogin && (
							<>
								<Route
									path="/album"
									exact
									component={() => <Album token={token} />}
								/>
								<Route
									path="/upload"
									exact
									component={() => <Upload token={token} />}
								/>
								<Route path="/logout" exact component={() => this.onLogout()} />
							</>
						)}
					</div>
				</Router>
			</div>
		);
	}
}
