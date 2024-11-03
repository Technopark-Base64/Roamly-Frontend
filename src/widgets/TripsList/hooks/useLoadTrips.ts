import { useEffect, useState } from 'react';
import { ITrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
import { getTrips } from '../api/getTrips';


export const useLoadTrips = () => {
	const [Trips, setTrips] = useState<ITrip[]>([]);
	const { Notify } = useNotificationService();

	const {
		data,
		error,
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

	return { Trips };
};