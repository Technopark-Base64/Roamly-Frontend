import { GoogleMap, Marker } from '@react-google-maps/api';
import React from 'react';
import { useCurrentTrip } from 'src/entities/Trip';


export const MapWidget = () => {
	const { currentMapPlace, currentTrip } = useCurrentTrip();
	const mapStyle = {
		height: '600px',
		width: '100%',
	};

	const position = currentMapPlace?.location ?? { lng: 0, lat: 0 };
	const zoom = currentMapPlace?.placeId === currentTrip?.area.placeId ? 11 : 16;

	const showPoint = currentMapPlace?.placeId !== currentTrip?.area.placeId;

	return (
		<GoogleMap mapContainerStyle={mapStyle} center={position} zoom={zoom}>
			{ showPoint && <Marker position={position} /> }
		</GoogleMap>
	);
};
