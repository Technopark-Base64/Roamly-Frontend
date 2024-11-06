import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/app/providers/StoreProvider';
import { IPlace } from 'src/entities/Place';
import { clearMap as clearM, setPlace as setP, setView as setV, setZoom as setZ } from '../lib/slices/MapStorage';
import { getMapProps } from '../model/selectors/getMapProps';

export const useGoogleMap = () => {
	const { selectedPlace, currentView, currentZoom } = useSelector(getMapProps);
	const dispatch = useDispatch<AppDispatch>();

	const setPlace = (place: IPlace | null) => {
		dispatch(setP(place));
	};

	const setView = (location: IPlace['location']) => {
		dispatch(setV(location));
	};

	const setZoom = (zoom: number) => {
		dispatch(setZ(zoom));
	};

	const clearMap = () => {
		dispatch(clearM());
	};

	return { selectedPlace, currentView, currentZoom, setPlace, setView, setZoom, clearMap };
};
