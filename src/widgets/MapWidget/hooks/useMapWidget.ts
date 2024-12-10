import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/app/providers/StoreProvider';
import { IPlace } from 'src/entities/Place';
import {
	clearMap as clearM,
	setView as setV,
	setZoom as setZ,
	setPlace as setP,
	setMarkers as setM,
	setSelectedId as setS,
	setCircle as setC,
} from '../lib/slices/MapStorage';
import { getMapProps } from '../model/selectors/getMapProps';
import { IMarker, TCircle } from '../model/types';

export const useMapWidget = () => {
	const MapProps = useSelector(getMapProps);
	const dispatch = useDispatch<AppDispatch>();

	const setView = (location: IPlace['location']) => {
		dispatch(setV(location));
	};

	const setZoom = (zoom: number) => {
		dispatch(setZ(zoom));
	};

	const setMarkers = (markers: IMarker[], isRoute = false) => {
		dispatch(setM({
			markers,
			isRoute,
		}));
	};

	const selectPlace = (placeId: string) => {
		dispatch(setS(placeId));
	};

	const setMapSelectedPlace = (place: IPlace | null) => {
		dispatch(setP(place));
	};

	const setCircle = (circle: TCircle | null) => {
		dispatch(setC(circle));
	};

	const clearMap = () => {
		dispatch(clearM());
	};

	return { ...MapProps, setView, setZoom, setMarkers, selectPlace, setMapSelectedPlace, clearMap, setCircle };
};