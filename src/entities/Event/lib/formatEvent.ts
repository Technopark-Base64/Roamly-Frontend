import { IFormattedEvent, IEvent } from '../model/types';

export const formatEvent = (event: IEvent): IFormattedEvent => ({
	time: event.startTime.toLocaleTimeString().slice(0, -3),
	duration: getDiffFormatted(event.startTime, event.endTime),
	photo: event.place?.photos[0],
	name: event.name || event.place?.name || 'Новое событие',
});

const getDiffFormatted = (start: Date, end: Date) => {
	const min = Math.floor( (end.getTime() - start.getTime())/ (1000 * 60));

	const hours = Math.floor(min / 60);
	const minutes = min % 60;

	return `${hours ? `${hours} ч.` : ''} ${minutes ? `${minutes} мин.` : ''}`;
};