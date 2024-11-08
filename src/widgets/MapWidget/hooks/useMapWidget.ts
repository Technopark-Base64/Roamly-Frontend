import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/app/providers/StoreProvider';
import { IPlace } from 'src/entities/Place';
import {
	clearMap as clearM,
	setView as setV,
	setZoom as setZ,
	setMarkers as setM,
	setSelectedId as setS,
} from '../lib/slices/MapStorage';
import { getMapProps } from '../model/selectors/getMapProps';
import { IMarker } from '../model/types';

export const useMapWidget = () => {
	const { currentView, currentZoom, markers, selectedId } = useSelector(getMapProps);
	const dispatch = useDispatch<AppDispatch>();

	const setView = (location: IPlace['location']) => {
		dispatch(setV(location));
	};

	const setZoom = (zoom: number) => {
		dispatch(setZ(zoom));
	};

	const setMarkers = (mks: IMarker[]) => {
		dispatch(setM(mks));
		selectPlace('');
	};

	const selectPlace = (placeId: string) => {
		dispatch(setS(placeId));
	};

	const clearMap = () => {
		dispatch(clearM());
	};

	return { currentView, currentZoom, markers, selectedId,
		setView, setZoom, setMarkers, selectPlace, clearMap };
};