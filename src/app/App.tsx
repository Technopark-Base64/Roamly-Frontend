import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { TripPage } from '../pages/TripPage';
import { Navbar } from '../widgets/Navbar';
import './App.scss';


const App = () => {
	return (
		<div className="App">
			<Navbar />
			<div className="AppContent">
				<Routes>
					<Route path="/" element={<MainPage/>}/>
					<Route path="/trip" element={<TripPage/>}/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
