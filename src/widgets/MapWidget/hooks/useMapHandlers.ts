import { useEffect } from 'react';
import { IPlaceResponse, mapResponseToPlace } from 'src/entities/Place';
import { useGoogleMap } from './useGoogleMap';

export const useMapHandlers = (map: google.maps.Map | null) => {
	const { setZoom, setView, setPlace } = useGoogleMap();

	// Удаляем метку при выходе с карты
	useEffect(() => {
		return () => setPlace(null);
	}, []);

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
				console.log(place, place?.photos?.[0]?.getUrl());
				setPlace(mapResponseToPlace(place as IPlaceResponse));
			} else {
				console.error('Ошибка при поиске места по ID: ', status);
			}
		});

	};

	return { handleChangeCenter, handleZoomChange, handleMapClick };
};