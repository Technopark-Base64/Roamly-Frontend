import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from 'src/pages/LoginPage';
import { MainPage } from 'src/pages/MainPage';
import { Page404 } from 'src/pages/Page404';
import { TripPage } from 'src/pages/TripPage';
import { Navbar } from 'src/widgets/Navbar';
import './App.scss';
import { useAuth } from 'src/features/Authorization';
import { useCurrentUser } from 'src/entities/User';
import { Redirect } from 'src/shared/components/Redirect';


const App = () => {
	const { CheckAuth } = useAuth({});
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser } = useCurrentUser();

	useEffect(() => {
		CheckAuth().then(() => setIsLoading(false));
	}, []);

	return (
		<div className="App">
			<Navbar />
			{!isLoading &&
				<div className="AppContent">
					<Routes>
						<Route path="/login" element={!currentUser ? <LoginPage/> : <Redirect url="/" replace={true} />}/>
						<Route path="/" element={currentUser ? <MainPage/> : <Redirect url="/login" replace={true} />}/>
						<Route path="/trip/:id" element={currentUser ? <TripPage/> : <Redirect url="/login" replace={true} />}/>
						<Route path="*" element={<Page404/>}/>
					</Routes>
				</div>
			}
		</div>
	);
};

export default App;
