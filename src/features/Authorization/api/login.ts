import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
	email: string,
	password: string,
}

export const requestLogin = ({ email, password }: IProps) => ({
	url: `${BACKEND_API_URL}/auth/login`,
	options: {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({ email, password }),
	},
	enabled: false,
});
