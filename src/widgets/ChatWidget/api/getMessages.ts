import { mapResponseToMessage } from 'src/entities/Message';
import { BACKEND_API_URL } from 'src/shared/config';

export const getMessages = (id: string) => ({
	url: `${BACKEND_API_URL}/chat/${id}`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
	},
	enabled: true,
	notifyOnError: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.messages.map(mapResponseToMessage),
});
