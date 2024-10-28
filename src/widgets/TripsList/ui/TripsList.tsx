import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITrip, useCurrentTrip } from 'src/entities/Trip';
import { TripCard } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { getTrips } from '../api/getTrips';
import cls from './style.module.scss';

interface IProps {
	showPast?: boolean,
}

export const TripsList = ({ showPast = false }: IProps) => {
	const [trips, setTrips] = useState<ITrip[]>([]);
	const { setCurrentTrip } = useCurrentTrip();
	const navigate = useNavigate();

	const {
		data,
	} = useFetch<ITrip[]>(getTrips());

	useEffect(() => {
		console.log(data);
		data && setTrips(data);
	}, [data]);
	
	const handleClick = (trip: ITrip) => {
		setCurrentTrip(trip);
		navigate(`/trip/${trip.id}`);
	};

	const list = useMemo(() => {
		const now = (new Date()).getTime();
		return trips.filter((trip) => (trip.endTime.getTime() - now < 0) === showPast);
	}, [showPast, trips]);

	return (
		<div className={cls.listContainer}>
			{!list.length &&
				<div className={cls.emptyLabel}>
					Пока ничего нет
				</div>
			}

			{!!list.length && list.map((trip) => (
				<TripCard
					trip={trip}
					key={trip.id}
					onClick={() => handleClick(trip)}
				/>
			))}

		</div>
	);
};
