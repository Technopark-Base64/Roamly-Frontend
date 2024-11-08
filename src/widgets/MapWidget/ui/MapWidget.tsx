import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useEffect, useMemo, useState } from 'react';
import { useCurrentTrip } from 'src/entities/Trip';
import { getLength } from 'src/shared/utils';
import { useMapHandlers } from '../hooks/useMapHandlers';
import { useMapWidget } from '../hooks/useMapWidget';
import { findCenterOfPoints } from '../lib/findCenterOfPoints';

const mapStyle = {
	height: '650px',
	width: '100%',
};

export const MapWidget = () => {
	const { currentTrip } = useCurrentTrip();
	const { currentView, currentZoom, markers, selectedId } = useMapWidget();
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const { handleChangeCenter, handleZoomChange, handleMapClick } = useMapHandlers(map);

	useEffect(() => {
		const location = selectedId && markers?.find((m) => m.id === selectedId)?.location;
		if (location && map) {
			map.setCenter(location);
			map.setZoom(16);
		}
	}, [selectedId]);

	useEffect(() => {
		if (map) {
			const average = findCenterOfPoints(markers);
			const actual = {
				lng: map.getCenter()?.lng() ?? 0,
				lat: map.getCenter()?.lat() ?? 0,
			};

			if (getLength(average, actual) > 3) {
				map.setCenter(average);
			}
			map.setZoom(12);
		}
	}, [markers]);

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
