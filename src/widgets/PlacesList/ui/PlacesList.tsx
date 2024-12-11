import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMapWidget } from 'src/widgets/MapWidget';
import { COLLAPSED_PLACECARD_HEIGHT, IPlace, PlaceCard, recomsPlaces, searchPlaces } from 'src/entities/Place';
import { useCurrentTrip } from 'src/entities/Trip';
import { CheckboxItem } from 'src/shared/components/CheckboxItem';
import { Input } from 'src/shared/components/Input';
import { LoadingScreen } from 'src/shared/components/LoadingScreen';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useDialogService } from 'src/shared/services/dialog';
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
	const { OpenDialog } = useDialogService();
	const { setMarkers, selectPlace, selectedId, circle, setMapSelectedPlace, mapSelectedPlace } = useMapWidget();
	const { AddPlace } = useAddPlaceToTrip();
	const { RemovePlace } = useRemovePlaceFromTrip();

	const [category, setCategory] = useState<TCategory['name'][]>([]);
	const [showFilters, setShowFilters] = useState(false);
	const [showMyPlaces, setShowMyPlaces] = useState(false);
	const [search, setSearch] = useState('');
	const listRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setShowMyPlaces(menu === 'myplaces');
		return () => setMapSelectedPlace(null);
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
			label: 'Музеи искусств'
		},
		{
			name: 'tourist_attraction',
			label: 'Знаковые места'
		},
		{
			name: 'art_gallery',
			label: 'Картинные галереи'
		},
		{
			name: 'church',
			label: 'Храмы, церкви, мечети'
		},
		{
			name: 'park',
			label: 'Парки и заповедники'
		},
	];

	const toggleCategory = (cat: TCategory['name']) => {
		const index = category.indexOf(cat);

		if (index === -1) {
			setCategory([...category, cat]);
		} else {
			category.splice(index, 1);
			setCategory([...category]);
		}
	};

	const {
		data: recomData,
		error: recomError,
		refetch: recomRefetch,
		isFetching: isRecomFetching,
	} = useFetch<IPlace[]>(recomsPlaces(category, circle
		?? {
			center: currentTrip?.area.location ?? { lat: 0, lng: 0 },
			radius: 20000,
		}));

	useEffect(() => {
		currentTrip && recomRefetch();
	}, [category, circle]);

	const list = useMemo(() => {
		const places = (showMyPlaces ? currentTrip?.places : search ? searchData : recomData) ?? [];

		return !showMyPlaces && mapSelectedPlace ? [...places, mapSelectedPlace] : places;
	}, [showMyPlaces, currentTrip, search, searchData, recomData, mapSelectedPlace]);

	useEffect(() => {
		list.length && setMarkers(list.map((pl) => ({
			id: pl.placeId,
			title: pl.name,
			location: pl.location,
		})));

		selectPlace('');
	}, [list]);

	useEffect(() => {
		listRef.current?.scrollTo(0, (list.findIndex((pl) => pl.placeId === selectedId) ?? 0) * COLLAPSED_PLACECARD_HEIGHT);
	}, [selectedId]);

	const handleAddPlace = (placeId: string) => {
		const onboarding = +(localStorage.getItem('add-place-onboarding') ?? 0);

		AddPlace(placeId);

		if (onboarding < 2) {
			OpenDialog({
				icon: <CalendarMonthOutlinedIcon/>,
				text: 'Добавьте посещение этого места в календарь',
				subtext: 'Вы выбрали интересное место - теперь запланируйте его посещение, перейдя в Календарь',
				onAccept: () => {
					navigate(`${location.pathname}#calendar`);
					localStorage.setItem('add-place-onboarding', '2');
				},
				onCancel: () => localStorage.setItem('add-place-onboarding', `${onboarding + 1}`),
				acceptText: 'Перейти в Календарь',
				cancelText: onboarding < 1 ? 'Позже' : 'Больше не показывать',
			});
		}
	};

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
								<CheckboxItem
									name={cat.label}
									value={category.includes(cat.name)}
									onChange={() => toggleCategory(cat.name)}
									key={key}
								/>
							)}
						</div>
					}
				</>
			}

			<div className={cls.listContainer} ref={listRef}>
				{!list.length && (!(search ? searchError : recomError) || showMyPlaces) &&
					<div className={cls.label}>
						{showMyPlaces ? 'Места не выбраны' : (search ? isSearchFetching : isRecomFetching) ? <LoadingScreen /> : 'Ничего не найдено'}
					</div>
				}

				{(search ? searchError : recomError) && !(search ? isSearchFetching : isRecomFetching) && !list.length && !showMyPlaces &&
					<div className={cls.label}>
						<span className={cls.errLabel}>
							{ search ? searchError : recomError }
						</span>
					</div>
				}

				{list.map((place, index) => (
					<PlaceCard
						place={place}
						key={place.placeId}
						selected={!!currentTrip?.places.find((pl) => pl.placeId === place.placeId)}
						isOpened={place.placeId === selectedId}
						onAdd={() => handleAddPlace(place.placeId)}
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
