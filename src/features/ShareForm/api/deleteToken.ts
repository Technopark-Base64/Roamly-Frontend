import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
	trip_id: string,
	access: 'reader' | 'editor'
}

export const deleteToken = (props: IProps) => ({
	url: `${BACKEND_API_URL}/trip/invite/`,
	options: {
		method: 'DELETE',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
		body:  JSON.stringify(props)
	},
	enabled: false,
	mapFunction: () => ({ [props.access]: null }),
});
