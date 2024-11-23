import { IEvent } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { getSchedule } from '../api/schedule';


export const useAutoSchedule = () => {
	const { currentTrip, setCurrentTripEvents } = useCurrentTrip();

	const {
		isFetching: LoadingSchedule,
		refetch,
	} = useFetch<IEvent[]>(getSchedule(currentTrip?.id ?? ''));

	const AutoSchedule = () => {
		refetch().then((res) => {
			res && setCurrentTripEvents(res);
		});
	};

	return { AutoSchedule, LoadingSchedule };
};
