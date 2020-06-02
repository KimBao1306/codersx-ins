import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {
	Collapse,
	Nav,
	NavItem,
	NavbarToggler,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

export default function MainMenu(props) {
	const {isLogin} = props;

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="mr-auto" navbar>
					<NavItem>
						<Link to="/" className="nav-link">
							Home
						</Link>
					</NavItem>
				</Nav>
				<Nav navbar>
					<UncontrolledDropdown inNavbar>
						{!isLogin && (
							<>
								<DropdownToggle nav caret>
									User
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>
										<Link to="/login" className="nav-link">
											Login
										</Link>
									</DropdownItem>
									<DropdownItem>
										<Link to="/register" className="nav-link">
											Register
										</Link>
									</DropdownItem>
									<DropdownItem>
										<Link to="/reset-psw" className="nav-link">
											Reset Password
										</Link>
									</DropdownItem>
									{/* <DropdownItem>Option 2</DropdownItem> */}
									{/* <DropdownItem divider /> */}
									{/* <DropdownItem>Reset</DropdownItem> */}
								</DropdownMenu>
							</>
						)}
						{isLogin && (
							<>
								<DropdownToggle nav caret>
									Hi!
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>
										<Link to="/album" className="nav-link">
											My Images
										</Link>
									</DropdownItem>
									<DropdownItem>
										<Link to="/upload" className="nav-link">
											Upload Image
										</Link>
									</DropdownItem>
									<DropdownItem>
										<Link to="/logout" className="nav-link">
											Logout
										</Link>
									</DropdownItem>
								</DropdownMenu>
							</>
						)}
					</UncontrolledDropdown>
				</Nav>
			</Collapse>
		</>
	);
}
