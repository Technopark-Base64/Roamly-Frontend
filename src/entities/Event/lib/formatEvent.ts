import { IPlace } from '../../Place';
import { IFormattedEvent, IEvent } from '../model/types';

const NO_PLACE: IPlace = {
	formattedAddress: '',
	location: {
		lat: 0,
		lng: 0,
	},
	name: 'Место не выбрано',
	photos: [],
	placeId: '',
	rating: 0,
	types: [],
};

export const formatEvent = (event: IEvent): IFormattedEvent => ({
	time: event.startTime.toLocaleTimeString().slice(0, -3),
	duration: getDiffFormatted(event.startTime, event.endTime),
	place: event.place ?? NO_PLACE,
});

const getDiffFormatted = (start: Date, end: Date) => {
	const min = Math.floor( (end.getTime() - start.getTime())/ (1000 * 60));

	const hours = Math.floor(min / 60);
	const minutes = min % 60;

	return `${hours ? `${hours} ч.` : ''} ${minutes ? `${minutes} мин.` : ''}`;
};
