import React from 'react';
import './Banner.scss';

function Banner(props) {
	return (
		<div className="banner">
			<div className="container">
				<div className="row banner__inner">
					<div className="col-md-6">
						<div className="banner__item-left">
							<h1 className="banner__title">Your Photo - Your Memory</h1>
							<p className="banner__desc">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
								Officia, dolorum!
							</p>
							<div className="btn btn-hover btn-primary">
								Save your photo - Sign Up
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<img
							src="https://static.dribbble.com/assets/art-banners/romainbriaux-9270a203743088cf36b939b04708d9a18fa794e04373964283a2d87c8f6fba0f.png"
							alt="banner"
							className="banner__image"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Banner;
