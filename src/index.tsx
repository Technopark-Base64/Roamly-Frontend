import { LoadScript } from '@react-google-maps/api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'src/app/providers/StoreProvider';
import App from './app/App';
import { GOOGLE_API_KEY } from './shared/config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (navigator.serviceWorker) {
	window.onload = () => {
		navigator.serviceWorker.register(
			'/sw.js'
		);
	};
}

root.render(
	<BrowserRouter>
		<StoreProvider>
			<LoadScript googleMapsApiKey={GOOGLE_API_KEY ?? ''} libraries={['places']} >
				<App />
			</LoadScript>
		</StoreProvider>
	</BrowserRouter>
);
