import { useEffect, useState } from 'react';
import { IPlace, searchRegions } from '../../../entities/Place';
import { PlaceCard } from '../../../entities/PlaceCard';
import cls from './style.module.scss';

export const TripsList = () => {
	const [regions, setRegions] = useState<IPlace[]>([]);

	useEffect(() => {
		searchRegions('Москва').then((res) => {
			setRegions(res);
			console.log(res[0]);
		});
	}, []);

	return (
		<div className={cls.listContainer}>
			{!regions.length &&
				<div className={cls.emptyLabel}>
					Пока ничего нет
				</div>
			}

			{!!regions.length && regions.map((pl) => {
				return <PlaceCard place={pl} key={pl.place_id} />;
			})}
		</div>
	);
};