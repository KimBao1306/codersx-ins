import React from 'react';
import {Navbar} from 'reactstrap';

import Logo from '../../components/Logo/Logo';
import MainMenu from '../../components/MainMenu/MainMenu';

export default class Header extends React.Component {
	render() {
		const {isLogin} = this.props;

		return (
			<Navbar className="row mb-5" color="light" light expand="md">
				<Logo src={'/inslogo.png'} />
				<MainMenu isLogin={isLogin} />
			</Navbar>
		);
	}
}
