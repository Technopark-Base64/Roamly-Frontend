import { useEffect, useState } from 'react';
import { IPlace } from 'src/entities/Place';
import { useCurrentTrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
import { addPlaceToTrip } from '../api/addPlaceToTrip';


export const useAddPlaceToTrip = () => {
	const { currentTrip, setCurrentTripPlaces } = useCurrentTrip();
	const { Notify } = useNotificationService();

	const [placeIdToAdd, AddPlace] = useState('');
	const {
		data: addPlaceRes,
		refetch: addPlaceReq,
		error,
	} = useFetch<IPlace[]>(addPlaceToTrip({
		place_id: placeIdToAdd,
		trip_id: currentTrip?.id ?? '',
	}));

	useEffect(() => {
		placeIdToAdd && addPlaceReq();
	}, [placeIdToAdd]);

	useEffect(() => {
		addPlaceRes && setCurrentTripPlaces(addPlaceRes);
	}, [addPlaceRes]);

	useEffect(() => {
		error && Notify({
			error: true,
			message: error,
		});
	}, [error]);

	return { AddPlace };
};
