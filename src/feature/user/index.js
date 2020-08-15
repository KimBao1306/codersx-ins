import React from 'react';
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom';
import Login from './pages/Login';
import Upload from './pages/Upload';

function User(props) {
	const routeMatch = useRouteMatch();
	return (
		<>
			<Switch>
				<Redirect
					exact
					path={`${routeMatch.url}`}
					to={`${routeMatch.url}/sign-in`}
				/>
				<Route
					exact
					path={`${routeMatch.url}/sign-in`}
					component={() => <Login />}
				/>

				<Route
					exact
					path={`${routeMatch.url}/upload`}
					component={() => <Upload />}
				/>

				<Route
					exact
					path={`${routeMatch.url}/forgot`}
					component={() => <Login />}
				/>
			</Switch>
		</>
	);
}

export default User;
