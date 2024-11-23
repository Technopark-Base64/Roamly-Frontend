import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITrip, useCurrentTrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { autoSchedule } from '../api/autoSchedule';


export const useAutoSchedule = () => {
	const { currentTrip, setCurrentTrip } = useCurrentTrip();
	const navigate = useNavigate();

	const {
		data: scheduleData,
		isFetching: scheduleLoading,
		refetch: AutoSchedule,
	} = useFetch<ITrip>(autoSchedule(currentTrip?.id ?? ''));

	useEffect(() => {
		scheduleData && setCurrentTrip(scheduleData);
		navigate(`${location.pathname}#main`, { replace: true });
	}, [scheduleData]);
  
	return { scheduleLoading, AutoSchedule };
};
