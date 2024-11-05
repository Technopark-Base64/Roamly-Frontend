import { useEffect } from 'react';
import { IEventResponse, mapResponseToEvent } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
import { updateEvent } from '../api/updateEvent';

interface IProps {
	id: string,
	name?: string,
	place_id?: string,
	trip_id: string,
	start_time: string,
	end_time: string
}

export const useCreateUpdateEvent = (props: IProps) => {
	const { currentTrip, setCurrentTripEvents } = useCurrentTrip();
	const events = currentTrip?.events ?? [];
	const { Notify } = useNotificationService();

	const {
		data: updateRes,
		refetch: UpdateEvent,
		error: updateError,
	} = useFetch<IEventResponse>(updateEvent(props));

	useEffect(() => {
		if (!updateRes)
			return;

		const updatedEvent = mapResponseToEvent(updateRes, currentTrip?.places ?? []);
		console.log(updatedEvent);

		setCurrentTripEvents(events.map((event) =>
			event.id === updatedEvent.id ? updatedEvent : event
		));
	}, [updateRes]);

	useEffect(() => {
		updateError && Notify({
			error: true,
			message: updateError,
		});
	}, [updateError]);

	return { UpdateEvent };
};