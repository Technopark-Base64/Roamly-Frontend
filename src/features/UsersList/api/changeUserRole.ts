import { UserRole } from 'src/entities/User';
import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
	access: UserRole,
	member_id: number,
	trip_id: string,
}

export const changeUserRole = (props: IProps) => ({
	url: `${BACKEND_API_URL}/trip/member/`,
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => body.event,
});
