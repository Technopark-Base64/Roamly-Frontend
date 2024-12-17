import { BACKEND_API_URL } from 'src/shared/config';

export const sendMessages = (id: string, props: { message: string }) => ({
	url: `${BACKEND_API_URL}/chat/${id}`,
	options: {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(props),
	},
	enabled: false,
	notifyOnError: true,
});
