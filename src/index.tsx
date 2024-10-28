import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'src/app/providers/StoreProvider';
import App from './app/App';

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
			<App />
		</StoreProvider>
	</BrowserRouter>
);
