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
	const { setMarkers, selectPlace, selectedId, circle } = useMapWidget();
	const { AddPlace } = useAddPlaceToTrip();
	const { RemovePlace } = useRemovePlaceFromTrip();
	const [search, setSearch] = useState('');
	const listRef = useRef<HTMLDivElement | null>(null);

	const {
		data,
		error,
		refetch,
		isFetching,
	} = useFetch<IPlace[]>(searchPlaces(search, circle
		?? {
			center: currentTrip?.area.location ?? { lat: 0, lng: 0 },
			radius: 20000,
		}));

	useEffect(() => {
		search && refetch();
	}, [search, circle]);

	const list = search ? data : places;

	useEffect(() => {
		list && setMarkers(list.map((pl) => ({
			id: pl.placeId,
			title: pl.name,
			location: pl.location,
		})));

		selectPlace('');
	}, [list]);

	useEffect(() => {
		listRef.current?.scrollTo(0, (list?.findIndex((pl) => pl.placeId === selectedId) ?? 0) * COLLAPSED_PLACECARD_HEIGHT);
	}, [selectedId]);

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
						isOpened={place.placeId === selectedId}
						onAdd={() => AddPlace(place.placeId)}
						onRemove={() => RemovePlace(place.placeId)}
						onOpen={() => selectPlace(place.placeId)}
						onClickNext={index < list.length - 1 ? () => selectPlace(list[index + 1].placeId) : undefined}
						onClickPrev={index > 0 ? () => selectPlace(list[index - 1].placeId) : undefined}
					/>
				))}

			</div>
		</div>
	);
};
