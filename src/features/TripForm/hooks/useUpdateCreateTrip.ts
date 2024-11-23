import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from 'src/shared/hooks/useFetch';
import { newTrip } from '../api/newTrip';
import { updateTrip } from '../api/updateTrip';
import { INewTripResponse } from '../model/types';

interface IProps {
  id: string,
	name?: string,
	defaultName: string,
  area_id: string,
  start_time: string,
  end_time: string
}

export const useUpdateCreateTrip = (props: IProps) => {
	const navigate = useNavigate();

	const {
		data: createRes,
		refetch: CreateTrip,
	} = useFetch<INewTripResponse>(newTrip(props));

	const {
		refetch: UpdateTrip,
	} = useFetch<INewTripResponse>(updateTrip(props));

	useEffect(() => {
		createRes && navigate(`/trip/${createRes.id}`);
	}, [createRes]);

	return { UpdateTrip, CreateTrip };
};