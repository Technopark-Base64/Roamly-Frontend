import { useEffect, useState } from 'react';
import { useCurrentTrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
import { deleteEvent } from '../api/deleteEvent';

interface IProps {
	onSuccess?: () => void;
}

export const useDeleteEvent = ({ onSuccess }: IProps) => {
	const { currentTrip, setCurrentTripEvents } = useCurrentTrip();
	const { Notify } = useNotificationService();
	const [idToDelete, Delete] = useState('');
	const events = currentTrip?.events ?? [];

	const {
		refetch,
		error,
	} = useFetch(deleteEvent(idToDelete));

	useEffect(() => {
		if (!idToDelete)
			return;

		refetch().then((res) => {
			if (!res)
				return;

			setCurrentTripEvents(events.filter((e) => e.id !== idToDelete));

			Notify({
				error: false,
				message: 'Событие успешно удалено',
			});

			onSuccess?.();
		});
	}, [idToDelete]);

	useEffect(() => {
		error && Notify({
			error: true,
			message: error,
		});
	}, [error]);

	return { Delete };
};
