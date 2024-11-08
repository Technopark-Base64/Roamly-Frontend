import React, { useEffect, useState } from 'react';
import { useMapWidget } from 'src/widgets/MapWidget';
import { IPlace, PlaceCard, searchPlaces } from 'src/entities/Place';
import { useCurrentTrip } from 'src/entities/Trip';
import { Input } from 'src/shared/components/Input';
import { LoadingScreen } from 'src/shared/components/LoadingScreen';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useAddPlaceToTrip } from '../hooks/useAddPlaceToTrip';
import { useRemovePlaceFromTrip } from '../hooks/useRemovePlaceFromTrip';
import cls from './style.module.scss';

interface IProps {
	places: IPlace[],
}

export const PlacesList = ({ places }: IProps) => {
	const { currentTrip } = useCurrentTrip();
	const { setMarkers, selectPlace } = useMapWidget();
	const { AddPlace } = useAddPlaceToTrip();
	const { RemovePlace } = useRemovePlaceFromTrip();
	const [search, setSearch] = useState('');

	const {
		data,
		error,
		refetch,
		isFetching,
	} = useFetch<IPlace[]>(searchPlaces(search, currentTrip?.area));

	useEffect(() => {
		search && refetch();
		selectPlace('');
	}, [search]);

	const list = search ? data : places;

	useEffect(() => {
		list && setMarkers(list?.map((pl) => ({
			id: pl.placeId,
			title: pl.name,
			location: pl.location,
		})));
	}, [list]);

	return (
		<div className={cls.wrapper}>
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
					<div className={cls.label}>
						{search ? 'Ничего не найдено' : 'Места не выбраны'}
					</div>
				}

				{isFetching && search && !list &&
					<LoadingScreen />
				}

				{!isFetching && !list && error &&
					<div className={cls.label}>
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
						onAdd={() => AddPlace(place.placeId)}
						onRemove={() => RemovePlace(place.placeId)}
						onMapClick={() => selectPlace(place.placeId)}
					/>
				))}

			</div>
		</div>
	);
};
