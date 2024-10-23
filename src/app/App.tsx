import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from 'src/pages/LoginPage';
import { MainPage } from 'src/pages/MainPage';
import { Page404 } from 'src/pages/Page404';
import { TripPage } from 'src/pages/TripPage';
import { Navbar } from 'src/widgets/Navbar';
import './App.scss';
import { useAuth } from 'src/features/Authorization';


const App = () => {
	const { CheckAuth } = useAuth({});

	useEffect(() => {
		CheckAuth();
	}, []);

	return (
		<div className="App">
			<Navbar />
			<div className="AppContent">
				<Routes>
					<Route path="/login" element={<LoginPage/>}/>
					<Route path="/" element={<MainPage/>}/>
					<Route path="/trip/:id" element={<TripPage/>}/>
					<Route path="*" element={<Page404/>}/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
