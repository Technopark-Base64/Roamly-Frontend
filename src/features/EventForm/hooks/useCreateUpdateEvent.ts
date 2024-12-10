import { IEventResponse, mapResponseToEvent } from 'src/entities/Event';
import { useCurrentTrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
import { MINUTE_MS } from 'src/shared/utils';
import { newEvent } from '../api/newEvent';
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
	const { Notify } = useNotificationService();
	const events = currentTrip?.events ?? [];

	const {
		refetch: updateRefetch,
	} = useFetch<IEventResponse>(updateEvent(props));

	const {
		refetch: createRefetch,
	} = useFetch<IEventResponse>(newEvent(props));

	const UpdateEvent = async () => {
		const updateRes = await updateRefetch();

		if (!updateRes)
			return false;

		const updatedEvent = mapResponseToEvent(updateRes, currentTrip?.places ?? []);

		setCurrentTripEvents(events.map((event) =>
			event.id === updatedEvent.id ? updatedEvent : event
		));

		Notify({
			error: false,
			message: 'Событие успешно обновлено',
		});

		return true;
	};

	const CreateEvent = async () => {
		const createRes = await createRefetch();

		if (!createRes)
			return false;

		const createdEvent = mapResponseToEvent(createRes, currentTrip?.places ?? []);
		const offset = MINUTE_MS * new Date().getTimezoneOffset();
		setCurrentTripEvents([...events, {
			...createdEvent,
			startTime: new Date(+createdEvent.startTime - offset),
			endTime: new Date(+createdEvent.endTime - offset),
		}]);

		Notify({
			error: false,
			message: 'Событие успешно создано',
		});

		return true;
	};

	return { UpdateEvent, CreateEvent };
};
