import { useEffect, useState } from 'react';
import { IPlace, searchPlaces } from '../../../entities/Place';
import { PlaceCard } from '../../../entities/PlaceCard';
import cls from './style.module.scss';

type TMenu = 'search' | 'selected' | 'calendar';

export const TripPage = () => {
	const [menu, setMenu] = useState<TMenu>('selected');
	const [searchInput, setSearchInput] = useState('');
	const [searchResult, setSearchResult] = useState<IPlace[]>([]);
	const [selectedPlaces, setSelectedPlaces] = useState<IPlace[]>([]);

	const region: IPlace = {
		'formatted_address': 'Москва, Россия',
		'geometry': {
			'location': {
				'lat': 55.755826,
				'lng': 37.6172999
			},
		},
		'name': 'Москва',
		'photos': [
			{
				'height': 875,
				'photo_reference': 'AdCG2DPbiYwpmR_WDUU6jwIdfKZSwIIN5B93nXEI-I4lyd2c3J-qVqFZXZ6eKaLw2mJgid46LiQl53JrtzlM_qsmUQbpLXd_jcwhmiz9GCgmnjeuV1Gx3vwh9vI8PHEPDlOGv28qTn515Cjsv3KK-Rc1ZjU37xi2VbPHP7zjayOXeJob3qx4',
				'width': 667
			}
		],
		'place_id': 'ChIJybDUc_xKtUYRTM9XV8zWRD0',
		'types': [],
	};

	const handleSearchInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);

		const result = await searchPlaces(region, event.target.value);
		setSearchResult(result);
	};

	useEffect(() => {
		const handler = setTimeout(async () => {
			const result = await searchPlaces(region, searchInput);
			setSearchResult(result);
		}, 300);

		return () => clearTimeout(handler);
	}, [searchInput]);


	return (
		<div className={cls.page}>
			<PlaceCard place={region} />
			<div className={cls.content}>

				<div className={cls.buttonContainer}>
					<button className={cls.button} onClick={() => setMenu('selected')}>
						Выбранные
					</button>
					<button className={cls.button} onClick={() => setMenu('search')}>
						Поиск
					</button>
					<button className={cls.button} onClick={() => setMenu('calendar')}>
						Календарь
					</button>
				</div>

				{menu === 'search' &&
					<input placeholder="начните вводить" value={searchInput} onInput={handleSearchInput}/>
				}

				<div className={cls.placesList}>
					{menu === 'search' && searchResult.map((pl) => {
						return <PlaceCard
							place={pl}
							key={pl.place_id}
							onClick={() => setSelectedPlaces((prev) => {
								if (!prev.find((place) => place.place_id === pl.place_id)) {
									prev.push(pl);
								}
								return prev;
							})}
						/>;
					})}

					{menu === 'selected' && selectedPlaces.map((pl) => {
						return <PlaceCard place={pl} key={pl.place_id}/>;
					})}
				</div>

			</div>
		</div>
	);
};
