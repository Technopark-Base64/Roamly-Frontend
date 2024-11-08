import { IPlaceResponse, mapResponseToPlace } from 'src/entities/Place';
import { useMapWidget } from './useMapWidget';

export const useMapHandlers = (map: google.maps.Map | null) => {
	const { setZoom, setView } = useMapWidget();

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

	return { handleChangeCenter, handleZoomChange, handleMapClick };
};