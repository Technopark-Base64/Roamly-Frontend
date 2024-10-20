import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from 'src/pages/LoginPage';
import { MainPage } from 'src/pages/MainPage';
import { TripPage } from 'src/pages/TripPage';
import { Navbar } from 'src/widgets/Navbar';
import './App.scss';


const App = () => {
	return (
		<div className="App">
			<Navbar />
			<div className="AppContent">
				<Routes>
					<Route path="/login" element={<LoginPage/>}/>
					<Route path="/" element={<MainPage/>}/>
					<Route path="/trip" element={<TripPage/>}/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
