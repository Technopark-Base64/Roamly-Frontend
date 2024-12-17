import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { JoinPage } from 'src/pages/JoinPage';
import { LoginPage } from 'src/pages/LoginPage';
import { MainPage } from 'src/pages/MainPage';
import { Page404 } from 'src/pages/Page404';
import { TripPage } from 'src/pages/TripPage';
import { Navbar } from 'src/widgets/Navbar';
import { useAuth } from 'src/features/Authorization';
import { useCurrentUser } from 'src/entities/User';
import { BACKGROUNDS } from 'src/shared/assets/links';
import { Redirect } from 'src/shared/components/Redirect';
import { BACKEND_URL } from 'src/shared/config';
import { Dialog } from 'src/shared/services/dialog';
import { Notifications } from 'src/shared/services/notifications';
import { WebSocket } from 'src/shared/services/websocket';

import './App.scss';


const App = () => {
	const { CheckAuth } = useAuth({});
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser } = useCurrentUser();

	useEffect(() => {
		CheckAuth().then(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		if (currentUser) {
			!WebSocket.isOpened && WebSocket.init(`${BACKEND_URL}/notifications`);
		} else {
			WebSocket.isOpened && WebSocket.close();
		}
	}, [currentUser]);

	return (
		<div className="App">
			<img
				src={BACKGROUNDS[1]}
				className="background"
			/>
			<div className="backgroundFade"/>
			<Navbar />
			{!isLoading &&
				<div className="AppContent">
					<Routes>
						<Route path="/login" element={!currentUser ? <LoginPage/> : <Redirect url="/" replace={true} />}/>
						<Route path="/" element={currentUser ? <MainPage/> : <Redirect url="/login" replace={true} />}/>
						<Route path="/trip/:id" element={currentUser ? <TripPage/> : <Redirect url="/login" replace={true} />}/>
						<Route path="/join/:token" element={currentUser ? <JoinPage/> : <Redirect url="/login" replace={true} />}/>
						<Route path="*" element={<Page404/>}/>
					</Routes>
				</div>
			}
			<Notifications />
			<Dialog />
		</div>
	);
};

export default App;
