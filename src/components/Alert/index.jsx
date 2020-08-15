import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './Alert.scss';

const MySwal = withReactContent(Swal);

export const alertAuth = {
	success: (title, mess) => {
		MySwal.fire({
			icon: 'success',
			title: <p className="alert__title">{title}</p>,
			html: <p className="alert__mess">{mess}</p>,
			showConfirmButton: false,
			width: '600px',
			allowOutsideClick: false,
			timer: 1000,
		});
	},
	fail: (title, mess) => {
		MySwal.fire({
			icon: 'error',
			title: <p className="alert__title">{title}</p>,
			html: <p className="alert__mess">{mess}</p>,
			footer: (
				<a href="/" className="alert__footer">
					Forgot your password?
				</a>
			),
			showConfirmButton: false,
			width: '600px',
		});
	},
};
