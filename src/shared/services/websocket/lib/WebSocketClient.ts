import { TMessageHandler, IWebSocketMessage } from '../model/types';

class WebSocketClient {
	private ws: WebSocket | null = null;
	private handlers: Array<TMessageHandler> = [];
	isOpened = false;

	init (url: string) {
		if (this.ws) {
			console.warn('WebSocket already initialized. Call close() first.');
			return;
		}

		this.ws = new WebSocket(url);
		this.isOpened = true;

		this.ws.onopen = () => {
			console.log('WebSocket connection opened.');
		};

		this.ws.onmessage = (event) => {
			try {
				const message: IWebSocketMessage = JSON.parse(event.data);

				this.handlers.forEach((handler) => {
					handler(message);
				});
			} catch (err) {
				console.error('Error parsing WebSocket message');
			}
		};

		this.ws.onclose = () => {
			console.log('WebSocket connection closed');
			this.ws = null;
			this.isOpened = false;

			// Hard Restart
			this.init(url);
			// this.handlers = [];
		};

		this.ws.onerror = (error) => {
			console.error('WebSocket error occurred:', error);
			this.close();
		};
	}

	close(): void {
		if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
			this.ws.close();
		}
	}

	subscribe(handler: TMessageHandler): void {
		if (!this.ws) {
			console.warn('WebSocket not initialized. Call init() first.');
			return;
		}
		this.handlers.push(handler);
	}

	unsubscribe(handler: TMessageHandler): void {
		this.handlers = this.handlers.filter((h) => h !== handler);
	}
}

export const ws = new WebSocketClient();
