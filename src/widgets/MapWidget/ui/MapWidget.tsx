import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useEffect, useMemo, useState } from 'react';
import { MapPlaceCard } from 'src/entities/MapPlaceCard';
import { useCurrentTrip } from 'src/entities/Trip';
import { useAddPlaceToTrip, useRemovePlaceFromTrip } from '../../PlacesList';


export const MapWidget = () => {
	const { currentMapPlace, currentTrip } = useCurrentTrip();
	const { AddPlace } = useAddPlaceToTrip();
	const { RemovePlace } = useRemovePlaceFromTrip();
	const [showCard, setShowCard] = useState(true);
	const [map, setMap] = useState<google.maps.Map | null>(null);

	const mapStyle = {
		height: '650px',
		width: '100%',
	};

	// TODO Complete later
	const handleMapClick = (event: never) => {
		console.log(event, map);
	};

	useEffect(() => {
		map && map.addListener('click', handleMapClick);
	}, [map]);

	const position = currentMapPlace?.location ?? currentTrip?.area.location ?? { lng: 0, lat: 0 };
	const zoom = useMemo(() => currentMapPlace ? 16 : 12, []);

	return (
		<>
			<GoogleMap
				mapContainerStyle={mapStyle}
				onLoad={(map) => setMap(map)}
				center={position}
				zoom={zoom}
			>
				{currentMapPlace && showCard && <Marker position={position} /> }
			</GoogleMap>

			{currentMapPlace && showCard &&
				<MapPlaceCard
					place={currentMapPlace}
					selected={!!currentTrip?.places.find((pl) =>
						pl.placeId === currentMapPlace.placeId)}
					onAdd={() => AddPlace(currentMapPlace.placeId)}
					onRemove={() => RemovePlace(currentMapPlace.placeId)}
					onClose={() => setShowCard(false)}
				/>
			}
		</>
	);
};
