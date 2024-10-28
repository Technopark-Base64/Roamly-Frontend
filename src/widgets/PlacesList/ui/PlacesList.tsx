import React, { useEffect, useState } from 'react';
import { IPlace, PlaceCard, searchPlaces } from 'src/entities/Place';
import { ITrip, useCurrentTrip } from 'src/entities/Trip';
import { Input } from 'src/shared/components/Input';
import { useFetch } from 'src/shared/hooks/useFetch';
import { addPlaceToTrip } from '../api/addPlaceToTrip';
import cls from './style.module.scss';

interface IProps {
	places: IPlace[],
}

export const PlacesList = ({ places }: IProps) => {
	const { currentTrip, setCurrentTripPlaces } = useCurrentTrip();
	const [search, setSearch] = useState('');

	const {
		data,
		error,
		refetch,
		isFetching,
	} = useFetch<IPlace[]>(searchPlaces(search, currentTrip?.area));

	useEffect(() => {
		search && refetch();
	}, [search]);

	const [placeIdToAdd, setPlaceIdToAdd] = useState('');
	const {
		refetch: addPlace
	} = useFetch<ITrip>(addPlaceToTrip({
		place_id: placeIdToAdd,
		trip_id: currentTrip?.id ?? '',
	}));

	useEffect(() => {
		placeIdToAdd && addPlace();
	}, [placeIdToAdd]);

	const handleAddPlace = (place: IPlace) => {
		if (currentTrip && !currentTrip.places.find((pl) => pl.placeId === place.placeId)) {
			setPlaceIdToAdd(place.placeId);
		}
	};

	const handleRemovePlace = (place: IPlace) => {
		if (currentTrip)
			setCurrentTripPlaces(currentTrip.places.filter((pl) => pl.placeId !== place.placeId));
	};

	const list = search ? data : places;

	return (
		<>
			<div className={cls.inputContainer}>
				<Input
					initValue={search}
					placeholder="Поиск мест"
					delay={300}
					onChange={setSearch}
				/>
			</div>

			<div className={cls.listContainer}>
				{!list?.length && !isFetching && !error &&
					<div className={cls.emptyLabel}>
						{search ? 'Ничего не найдено' : 'Места не выбраны'}
					</div>
				}

				{error && search &&
					<div className={cls.emptyLabel}>
						Загрузка...
					</div>
				}

				{isFetching && !list &&
					<div className={cls.emptyLabel}>
						<span className={cls.errLabel}>
							{ error }
						</span>
					</div>
				}

				{list && list.map((place) => (
					<PlaceCard
						place={place}
						key={place.placeId}
						selected={!!currentTrip?.places.find((pl) => pl.placeId === place.placeId)}
						colorSelected={!!search}
						onAdd={() => handleAddPlace(place)}
						onRemove={() => handleRemovePlace(place)}
					/>
				))}

			</div>
		</>
	);
};
