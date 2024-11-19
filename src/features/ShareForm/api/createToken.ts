import { BACKEND_API_URL } from 'src/shared/config';

interface IProps {
	trip_id: string,
	access: 'reader' | 'editor'
}

export const createToken = (props: IProps) => ({
	url: `${BACKEND_API_URL}/trip/invite/`,
	options: {
		method: 'POST',
		headers: {
			accept: 'application/json',
		},
		credentials: 'include',
		body:  JSON.stringify(props)
	},
	enabled: false,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapFunction: (body: any) => ({ [props.access]: body.invite_token }),
});
