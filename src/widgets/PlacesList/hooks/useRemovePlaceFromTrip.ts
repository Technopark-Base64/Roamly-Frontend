import { useEffect, useState } from 'react';
import { IPlace } from 'src/entities/Place';
import { useCurrentTrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
import { removePlaceFromTrip } from '../api/removePlaceFromTrip';


export const useRemovePlaceFromTrip = () => {
	const { currentTrip, setCurrentTripPlaces } = useCurrentTrip();
	const { Notify } = useNotificationService();

	const [placeIdToRemove, RemovePlace] = useState('');
	const {
		data: removePlaceRes,
		refetch: removePlaceReq,
		error,
	} = useFetch<IPlace[]>(removePlaceFromTrip({
		place_id: placeIdToRemove,
		trip_id: currentTrip?.id ?? '',
	}));

	useEffect(() => {
		placeIdToRemove && removePlaceReq();
	}, [placeIdToRemove]);

	useEffect(() => {
		removePlaceRes && setCurrentTripPlaces(removePlaceRes);
	}, [removePlaceRes]);

	useEffect(() => {
		error && Notify({
			error: true,
			message: error,
		});
	}, [error]);

	return { RemovePlace };
};
