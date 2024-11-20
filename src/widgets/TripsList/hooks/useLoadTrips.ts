import { useEffect, useState } from 'react';
import { ITrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
import { IWebSocketMessage, WebSocket, WSActions } from 'src/shared/services/websocket';
import { getTrips } from '../api/getTrips';


export const useLoadTrips = () => {
	const [Trips, setTrips] = useState<ITrip[]>([]);
	const { Notify } = useNotificationService();

	const {
		data,
		error,
		refetch,
		isFetching,
	} = useFetch<ITrip[]>(getTrips());

	useEffect(() => {
		data && setTrips(data);
	}, [data]);

	useEffect(() => {
		error && Notify({
			error: true,
			message: error,
		});
	}, [error]);

	const handleWebsocket = (message: IWebSocketMessage) => {
		const actions = [WSActions.TripUpdate, WSActions.UsersUpdate];

		if (actions.includes(message.action)) {
			refetch();
			Notify({
				error: false,
				message: 'Список поездок обновлен',
			});
		}
	};

	useEffect(() => {
		WebSocket.subscribe(handleWebsocket);

		return () => WebSocket.unsubscribe(handleWebsocket);
	}, []);

	return { Trips, isLoading: isFetching };
};