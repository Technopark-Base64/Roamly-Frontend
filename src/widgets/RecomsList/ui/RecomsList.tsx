import React, { useEffect, useState } from 'react';
import { IPlace, PlaceCard, recomsPlaces } from 'src/entities/Place';
import { useCurrentTrip } from 'src/entities/Trip';
import { LoadingScreen } from 'src/shared/components/LoadingScreen';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useAddPlaceToTrip } from '../../PlacesList';
import { useRemovePlaceFromTrip } from '../../PlacesList';
import cls from './style.module.scss';

type TCategory = {
	name: 'art_gallery' | 'museum' | 'tourist_attraction' | 'church' | 'park',
	label: string,
}

export const RecomsList = () => {
	const { currentTrip } = useCurrentTrip();
	const { AddPlace } = useAddPlaceToTrip();
	const { RemovePlace } = useRemovePlaceFromTrip();
	const [category, setCategory] = useState<TCategory['name']>('museum');

	const categories: TCategory[] = [
		{
			name: 'museum',
			label: 'Музеи'
		},
		{
			name: 'tourist_attraction',
			label: 'Знаковые места'
		},
		{
			name: 'art_gallery',
			label: 'Галлереи'
		},
		{
			name: 'church',
			label: 'Храмы'
		},
		{
			name: 'park',
			label: 'Парки'
		},
	];

	const {
		data,
		error,
		refetch,
		isFetching,
	} = useFetch<IPlace[]>(recomsPlaces(category, currentTrip?.area));

	useEffect(() => {
		currentTrip && refetch();
	}, [category]);

	return (
		<>
			<div className={cls.label}>
				Выберите категорию
			</div>
			<div className={cls.categories}>
				{categories.map((cat, key) =>
					<button
						className={`shared-button ${category === cat.name && 'shared-button-active'}`}
						onClick={() => setCategory(cat.name)}
						key={key}
					>
						{cat.label}
					</button>
				)}
			</div>

			<div className={cls.listContainer}>
				{!data?.length && !error &&
					<div className={cls.label}>
						{isFetching ? <LoadingScreen /> : 'Ничего не найдено'}
					</div>
				}

				{error && !isFetching && !data?.length &&
					<div className={cls.label}>
						<span className={cls.errLabel}>
							{ error }
						</span>
					</div>
				}

				{data?.map((place) => (
					<PlaceCard
						place={place}
						key={place.placeId}
						selected={!!currentTrip?.places.find((pl) => pl.placeId === place.placeId)}
						colorSelected={true}
						onAdd={() => AddPlace(place.placeId)}
						onRemove={() => RemovePlace(place.placeId)}
					/>
				))}

			</div>
		</>
	);
};
