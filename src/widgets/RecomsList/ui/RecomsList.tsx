import React, { useEffect, useRef, useState } from 'react';
import { useMapWidget } from 'src/widgets/MapWidget';
import { COLLAPSED_PLACECARD_HEIGHT, IPlace, PlaceCard, recomsPlaces } from 'src/entities/Place';
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
	const { setMarkers, selectPlace, circle } = useMapWidget();
	const { AddPlace } = useAddPlaceToTrip();
	const { RemovePlace } = useRemovePlaceFromTrip();
	const [category, setCategory] = useState<TCategory['name']>('tourist_attraction');
	const [openedIndex, setOpenedIndex] = useState(-1);
	const listRef = useRef<HTMLDivElement | null>(null);

	const categories: TCategory[] = [
		{
			name: 'museum',
			label: 'Музеи'
		},
		{
			name: 'tourist_attraction',
			label: 'Достоп.'
		},
		{
			name: 'art_gallery',
			label: 'Галереи'
		},
		{
			name: 'church',
			label: 'Храмы'
		},
		// {
		// 	name: 'park',
		// 	label: 'Парки'
		// },
	];

	const {
		data,
		error,
		refetch,
		isFetching,
	} = useFetch<IPlace[]>(recomsPlaces([category], circle
		?? {
			center: currentTrip?.area.location ?? { lat: 0, lng: 0 },
			radius: 20000,
		}));

	useEffect(() => {
		currentTrip && refetch();
	}, [category, circle]);

	useEffect(() => {
		data && setMarkers(data?.map((pl) => ({
			id: pl.placeId,
			title: pl.name,
			location: pl.location,
		})));

		setOpenedIndex(-1);
	}, [data]);

	useEffect(() => {
		selectPlace(data?.[openedIndex]?.placeId ?? '');
		listRef.current?.scrollTo(0, openedIndex * COLLAPSED_PLACECARD_HEIGHT);
	}, [openedIndex]);

	return (
		<div className={cls.wrapper}>

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

			<div className={cls.listContainer} ref={listRef}>
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

				{data?.map((place, index) => (
					<PlaceCard
						place={place}
						key={place.placeId}
						selected={!!currentTrip?.places.find((pl) => pl.placeId === place.placeId)}
						isOpened={index === openedIndex}
						onAdd={() => AddPlace(place.placeId)}
						onRemove={() => RemovePlace(place.placeId)}
						onOpen={() => {
							setOpenedIndex(index);
							selectPlace(place.placeId);
						}}
						onClickNext={index < data.length - 1 ? () => setOpenedIndex(index + 1) : undefined}
						onClickPrev={index > 0 ? () => setOpenedIndex(index - 1) : undefined}
					/>
				))}

			</div>
		</div>
	);
};
