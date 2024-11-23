import { useEffect, useState } from 'react';
import { IPlace } from 'src/entities/Place';
import { useCurrentTrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { removePlaceFromTrip } from '../api/removePlaceFromTrip';


export const useRemovePlaceFromTrip = () => {
	const { currentTrip, setCurrentTripPlaces } = useCurrentTrip();

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
		RemovePlace('');
	}, [removePlaceRes]);

	useEffect(() => {
		RemovePlace('');
	}, [error]);

	return { RemovePlace };
};
