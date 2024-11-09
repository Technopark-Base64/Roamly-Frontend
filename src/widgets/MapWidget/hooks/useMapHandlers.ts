import { IPlaceResponse, mapResponseToPlace } from 'src/entities/Place';
import { useCurrentTrip } from 'src/entities/Trip';
import { getLength } from 'src/shared/utils';
import { findCenterOfPoints } from '../lib/findCenterOfPoints';
import { useMapWidget } from './useMapWidget';

export const useMapHandlers = (map: google.maps.Map | null) => {
	const { currentTrip } = useCurrentTrip();
	const { setZoom, setView, currentView, markers, setCircle, circle } = useMapWidget();

	const handleToggleCircle = () => {
		if (circle) {
			setCircle(null);
			return;
		}

		const bound = map?.getBounds()?.getNorthEast();
		const mapCenter = map?.getCenter();

		if (!mapCenter || !bound)
			return;

		const center = {
			lng: mapCenter.lng(),
			lat: mapCenter.lat(),
		};
		const corner = {
			lng: bound.lng(),
			lat: bound.lat(),
		};
		const radius = getLength(center, corner) * 0.6;

		setCircle({ center, radius });
	};

	const handleChangeCenter= () => {
		if (map) {
			setView({
				lat: map.getCenter()?.lat() ?? 0,
				lng: map.getCenter()?.lng() ?? 0,
			});
		}
	};

	const handleZoomChange = () => {
		if (map) {
			setZoom(map.getZoom() ?? 12);
		}
	};

	const handleMapClick = (event: google.maps.MapMouseEvent) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const { placeId } = event;

		if (!placeId)
			return;

		const service = new window.google.maps.places.PlacesService(document.createElement('div'));

		service.getDetails({ placeId }, (place, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				// TODO add logic
				return mapResponseToPlace(place as IPlaceResponse);
			} else {
				console.error('Ошибка при поиске места по ID: ', status);
			}
		});

	};

	const handleUpdateMarkers = () => {
		if (!map)
			return;

		const average = markers.length
			? findCenterOfPoints(markers)
			: currentTrip?.area.location ?? currentView;
		const actual = {
			lng: map.getCenter()?.lng() ?? 0,
			lat: map.getCenter()?.lat() ?? 0,
		};

		if (getLength(average, actual) > 3000) {
			map.setCenter(average);
		}
		map.setZoom(12);
	};

	return { handleChangeCenter, handleZoomChange, handleMapClick, handleUpdateMarkers, handleToggleCircle };
};