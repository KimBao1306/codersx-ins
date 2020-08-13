import Loading from 'components/Loading';
import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const Home = React.lazy(() => import('./feature/home/index'));
const User = React.lazy(() => import('./feature/user'));

function App(props) {
	return (
		<Suspense fallback={<Loading />}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={() => <Home />} />
					<Route path="/user" component={() => <User />} />

					<Route component={() => <div>Not Found</div>} />
				</Switch>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
