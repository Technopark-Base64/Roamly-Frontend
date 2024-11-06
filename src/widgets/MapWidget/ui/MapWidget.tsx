import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useMemo, useState } from 'react';
import { MapPlaceCard } from 'src/entities/MapPlaceCard';
import { useAddPlaceToTrip, useRemovePlaceFromTrip } from '../../PlacesList';
import { useGoogleMap } from '../hooks/useGoogleMap';
import { useMapHandlers } from '../hooks/useMapHandlers';

const mapStyle = {
	height: '650px',
	width: '100%',
};

export const MapWidget = () => {
	const { selectedPlace, currentView, currentZoom, setPlace } = useGoogleMap();
	const { AddPlace } = useAddPlaceToTrip();
	const { RemovePlace } = useRemovePlaceFromTrip();
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const { handleChangeCenter, handleZoomChange, handleMapClick } = useMapHandlers(map);

	const position = useMemo(() => selectedPlace?.location ?? currentView, [selectedPlace]);
	const zoom = useMemo(() => selectedPlace ? 16 : currentZoom, []);

	return (
		<>
			<GoogleMap
				mapContainerStyle={mapStyle}
				onLoad={(map) => setMap(map)}
				onCenterChanged={handleChangeCenter}
				onZoomChanged={handleZoomChange}
				onClick={handleMapClick}
				center={position}
				zoom={zoom}
			>
				{ selectedPlace && <Marker position={position} /> }
			</GoogleMap>

			{selectedPlace &&
				<MapPlaceCard
					place={selectedPlace}
					onAdd={() => AddPlace(selectedPlace.placeId)}
					onRemove={() => RemovePlace(selectedPlace.placeId)}
					onClose={() => setPlace(null)}
				/>
			}
		</>
	);
};
