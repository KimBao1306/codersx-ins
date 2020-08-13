import {faAngleDown, faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import cls from 'classnames';
import Logo from 'components/Logo/index';
import useComponentVisible from 'hooks/useComponentVisible';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './Header.scss';
import PropTypes from 'prop-types';

Header.propTypes = {
	userInfo: PropTypes.object,
	signOut: PropTypes.func.isRequired,
};

Header.defaultProps = {
	userInfo: {},
};

export default function Header({userInfo, signOut}) {
	//event on scroll fixed menu
	const [isScrollHeader, setIsScrollHeader] = useState(false);
	//event show menu in mobile
	const [menuMobile, setMenuMobile] = useState(false);
	//show hide dropdown
	const {
		ref: dropdownRef,
		isComponentVisible,
		setIsComponentVisible,
	} = useComponentVisible(false);

	function fixedHeaderOnScroll() {
		if (document.documentElement.scrollTop > 50) {
			setIsScrollHeader(true);
		} else {
			setIsScrollHeader(false);
		}
	}

	useEffect(() => {
		document.addEventListener('scroll', fixedHeaderOnScroll);
		return () => {
			document.removeEventListener('scroll', fixedHeaderOnScroll);
		};
	}, []);

	return (
		<header className={cls('header', {'on-scroll': isScrollHeader})}>
			<div className="container">
				<div className="row header__inner">
					<div className="col-sm-4 col-md-3">
						<Logo />
						<FontAwesomeIcon
							icon={faBars}
							className="icon header__bars"
							onClick={() => setMenuMobile(!menuMobile)}
						/>
					</div>
					<div className="col-sm-8 col-md-9">
						<div
							className={cls('header__overplay', {show: menuMobile})}
							onClick={() => setMenuMobile(!menuMobile)}
						></div>
						<ul className={cls('header__list', {show: menuMobile})}>
							<li className="header__item">
								<NavLink to="/" className="header__link">
									Home
								</NavLink>
							</li>
							<li className="header__item">
								<NavLink to="/" className="header__link">
									About
								</NavLink>
							</li>
							<li className="header__item">
								<NavLink to="/" className="header__link">
									Contact
								</NavLink>
							</li>
							<li className="header__item">
								<div
									className="header__link"
									ref={dropdownRef}
									onClick={() => setIsComponentVisible(!isComponentVisible)}
								>
									{userInfo.name ? `${userInfo.name}` : 'Account'}
									<FontAwesomeIcon icon={faAngleDown} className="icon" />
									{isComponentVisible && (
										<ul className="header-dropdown">
											{userInfo.name && (
												<>
													<li className="header__item header-dropdown__item">
														<NavLink to="/" className="header__link">
															Update Infomation
														</NavLink>
													</li>
													<li className="header__item header-dropdown__item">
														<NavLink
															to="/"
															className="header__link"
															onClick={signOut}
														>
															Logout
														</NavLink>
													</li>
												</>
											)}
											{!userInfo.name && (
												<>
													<li className="header__item header-dropdown__item">
														<NavLink
															to="/user/sign-in"
															className="header__link"
														>
															Login
														</NavLink>
													</li>
													<li className="header__item header-dropdown__item">
														<NavLink to="/" className="header__link">
															Register
														</NavLink>
													</li>
													<li className="header__item header-dropdown__item">
														<NavLink to="/" className="header__link">
															Forgot Password
														</NavLink>
													</li>
												</>
											)}
										</ul>
									)}
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
}
