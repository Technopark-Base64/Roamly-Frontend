import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
	member_id: number,
	trip_id: string,
}

export const deleteUser = (props: IProps) => ({
	url: `${BACKEND_API_URL}/trip/member`,
	options: {
		method: 'DELETE',
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
