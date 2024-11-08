import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useEffect, useMemo, useState } from 'react';
import { useCurrentTrip } from 'src/entities/Trip';
import { useMapHandlers } from '../hooks/useMapHandlers';
import { useMapWidget } from '../hooks/useMapWidget';

const mapStyle = {
	height: '650px',
	width: '100%',
};

export const MapWidget = () => {
	const { currentTrip } = useCurrentTrip();
	const { currentView, currentZoom, markers, selectedId } = useMapWidget();
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const { handleChangeCenter, handleZoomChange, handleMapClick, handleUpdateMarkers } = useMapHandlers(map);

	useEffect(() => {
		const location = selectedId && markers?.find((m) => m.id === selectedId)?.location;
		if (location && map) {
			map.setCenter(location);
			map.setZoom(16);
		}
	}, [selectedId]);

	useEffect(handleUpdateMarkers, [markers]);

	const position = useMemo(() => currentView, [currentTrip]);
	const zoom = useMemo(() => currentZoom, []);

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
				{markers && markers.map((mark) => (
					<Marker
						position={mark.location}
						title={mark.title}
						key={mark.id}
						icon={{
							path: window.google.maps.SymbolPath.CIRCLE,
							scale: 10,
							fillColor: selectedId === mark.id ? 'red' : 'blue',
							fillOpacity: 1,
							strokeColor: 'white',
							strokeWeight: 3,
						}}
					/>
				))}
			</GoogleMap>
		</>
	);
};
