import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
	email: string,
	login: string,
	password: string,
}

export const requestSignup = ({ email, login, password }: IProps) => ({
	url: `${BACKEND_API_URL}/auth/register`,
	options: {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({ email, password, login }),
	},
	enabled: false,
});
