import React, { useEffect, useRef, useState } from 'react';
import { useMapWidget } from 'src/widgets/MapWidget';
import { COLLAPSED_PLACECARD_HEIGHT, IPlace, PlaceCard, searchPlaces } from 'src/entities/Place';
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
	const [openedIndex, setOpenedIndex] = useState(-1);
	const listRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		listRef.current?.scrollTo(0, openedIndex * COLLAPSED_PLACECARD_HEIGHT);
	}, [openedIndex]);

	const {
		data,
		error,
		refetch,
		isFetching,
	} = useFetch<IPlace[]>(searchPlaces(search, currentTrip?.area));

	useEffect(() => {
		search && refetch();
	}, [search]);

	const list = search ? data : places;

	useEffect(() => {
		list && setMarkers(list.map((pl) => ({
			id: pl.placeId,
			title: pl.name,
			location: pl.location,
		})));

		setOpenedIndex(-1);
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

			<div className={cls.listContainer} ref={listRef}>
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

				{list && list.map((place, index) => (
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
						onClickNext={index < list.length - 1 ? () => setOpenedIndex(index + 1) : undefined}
						onClickPrev={index > 0 ? () => setOpenedIndex(index - 1) : undefined}
					/>
				))}

			</div>
		</div>
	);
};
