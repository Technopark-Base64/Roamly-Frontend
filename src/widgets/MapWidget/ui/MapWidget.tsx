import RadarOutlinedIcon from '@mui/icons-material/RadarOutlined';
import { Circle, DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import React, { useEffect, useMemo, useState } from 'react';
import { useCurrentTrip } from 'src/entities/Trip';
import { useMapHandlers } from '../hooks/useMapHandlers';
import { useMapWidget } from '../hooks/useMapWidget';
import cls from './style.module.scss';

const mapStyle = {
	height: '650px',
	width: '100%',
};

interface IProps {
	showCircle?: boolean,
}

export const MapWidget = ({ showCircle = true }: IProps) => {
	const { currentTrip } = useCurrentTrip();
	const { currentView, currentZoom, markers, isRoute, selectedId, selectPlace, circle } = useMapWidget();
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
	const { handleChangeCenter, handleZoomChange, handleMapClick, handleUpdateMarkers, handleToggleCircle } = useMapHandlers(map);

	useEffect(() => {
		const location = selectedId && markers?.find((m) => m.id === selectedId)?.location;
		if (location && map) {
			map.setCenter(location);
			map.setZoom(15);
		}
		if (!selectedId && map)
			map.setZoom(12);
	}, [selectedId]);

	useEffect(handleUpdateMarkers, [markers]);

	useEffect(() => {
		if (markers.length < 2 || !isRoute) {
			setDirectionsResponse(null);
			return;
		}

		const directionsService = new google.maps.DirectionsService();

		directionsService.route(
			{
				origin: markers[0].location,
				destination: markers[markers.length - 1].location,
				waypoints: markers.slice(1, -1).map((m) => ({ location: m.location })),
				travelMode: google.maps.TravelMode.WALKING
			},
			(result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					setDirectionsResponse(result);
				} else {
					console.error('error fetching directions', result, status);
				}
			}
		);
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
						icon={!isRoute || markers.length !== 1 ? {
							path: !isRoute
								? window.google.maps.SymbolPath.CIRCLE
								: '',
							scale: 10,
							fillColor: selectedId === mark.id ? 'red' : 'blue',
							fillOpacity: 1,
							strokeColor: 'white',
							strokeWeight: 3,
						} : undefined}
						onClick={() => selectPlace(mark.id)}
					/>
				))}

				{ directionsResponse && <DirectionsRenderer directions={directionsResponse} /> }

				{circle && showCircle &&
					<Circle
						center={circle.center}
						radius={circle.radius}
						options={{
							fillColor: 'rgba(127,190,255)',
							fillOpacity: 0.3,
							strokeColor: 'rgba(127,190,255)',
							strokeOpacity: 0.8,
							strokeWeight: 2,
						}}
					/>
				}

			</GoogleMap>

			{showCircle &&
				<button className={`shared-button shared-button-positive ${cls.circleButton}`} onClick={handleToggleCircle}>
					<RadarOutlinedIcon/> { circle ? 'Снять выделение' : 'Искать в этом радиусе'}
				</button>
			}
		</>
	);
};
