import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMapWidget } from 'src/widgets/MapWidget';
import { COLLAPSED_PLACECARD_HEIGHT, IPlace, PlaceCard, recomsPlaces, searchPlaces } from 'src/entities/Place';
import { useCurrentTrip } from 'src/entities/Trip';
import { Input } from 'src/shared/components/Input';
import { LoadingScreen } from 'src/shared/components/LoadingScreen';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useAddPlaceToTrip } from '../hooks/useAddPlaceToTrip';
import { useRemovePlaceFromTrip } from '../hooks/useRemovePlaceFromTrip';
import cls from './style.module.scss';

type TCategory = {
	name: 'art_gallery' | 'museum' | 'tourist_attraction' | 'church' | 'park',
	label: string,
}

export const PlacesList = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const menu = location.hash.replace('#', '');

	const { currentTrip } = useCurrentTrip();
	const { setMarkers, selectPlace, selectedId, circle } = useMapWidget();
	const { AddPlace } = useAddPlaceToTrip();
	const { RemovePlace } = useRemovePlaceFromTrip();

	const [category, setCategory] = useState<TCategory['name']>('tourist_attraction');
	const [showFilters, setShowFilters] = useState(false);
	const [showMyPlaces, setShowMyPlaces] = useState(false);
	const [search, setSearch] = useState('');
	const listRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setShowMyPlaces(menu === 'myplaces');
	}, [menu]);

	const {
		data: searchData,
		error: searchError,
		refetch: searchRefetch,
		isFetching: isSearchFetching,
	} = useFetch<IPlace[]>(searchPlaces(search, circle
		?? {
			center: currentTrip?.area.location ?? { lat: 0, lng: 0 },
			radius: 20000,
		}));

	useEffect(() => {
		search && searchRefetch();
	}, [search, circle]);

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
		data: recomData,
		error: recomError,
		refetch: recomRefetch,
		isFetching: isRecomFetching,
	} = useFetch<IPlace[]>(recomsPlaces([category], circle
		?? {
			center: currentTrip?.area.location ?? { lat: 0, lng: 0 },
			radius: 20000,
		}));

	useEffect(() => {
		currentTrip && recomRefetch();
	}, [category, circle]);

	const list = showMyPlaces ? currentTrip?.places ?? [] : search ? searchData : recomData;

	useEffect(() => {
		list && setMarkers(list?.map((pl) => ({
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

			<div className={cls.buttonContainer}>
				<button
					className={`shared-button ${!showMyPlaces && 'shared-button-active'}`}
					onClick={() =>navigate(`${location.pathname}#recoms`)}
				>
					Рекомендации
				</button>
				<button
					className={`shared-button ${showMyPlaces && 'shared-button-active'}`}
					onClick={() =>navigate(`${location.pathname}#myplaces`)}
				>
					Добавленные
				</button>
			</div>

			{!showMyPlaces &&
				<>
					<div className={cls.inputContainer}>
						<Input
							initValue={search}
							placeholder="Поиск мест"
							delay={300}
							onChange={setSearch}
						/>
						<button
							className={`shared-icon-button ${showFilters && 'shared-button-active'}`}
							onClick={() => setShowFilters(prev => !prev)}
						>
							<FilterAltOutlinedIcon />
						</button>
					</div>

					{showFilters &&
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
					}
				</>
			}

			<div className={cls.listContainer} ref={listRef}>
				{!list?.length && !(search ? searchError : recomError) &&
					<div className={cls.label}>
						{showMyPlaces ? 'Места не выбраны' : (search ? isSearchFetching : isRecomFetching) ? <LoadingScreen /> : 'Ничего не найдено'}
					</div>
				}

				{(search ? searchError : recomError) && !(search ? isSearchFetching : isRecomFetching) && !list?.length && !showMyPlaces &&
					<div className={cls.label}>
						<span className={cls.errLabel}>
							{ search ? searchError : recomError }
						</span>
					</div>
				}

				{list?.map((place, index) => (
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
