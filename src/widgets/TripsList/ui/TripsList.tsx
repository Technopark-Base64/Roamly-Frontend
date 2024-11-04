import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITrip, useCurrentTrip } from 'src/entities/Trip';
import { TripCard } from 'src/entities/Trip';
import { LoadingScreen } from '../../../shared/components/LoadingScreen';
import { useLoadTrips } from '../hooks/useLoadTrips';
import cls from './style.module.scss';

interface IProps {
	showPast?: boolean,
}

export const TripsList = ({ showPast = false }: IProps) => {
	const { setCurrentTrip } = useCurrentTrip();
	const { Trips, isLoading } = useLoadTrips();
	const navigate = useNavigate();
	
	const handleClick = (trip: ITrip) => {
		setCurrentTrip(trip);
		navigate(`/trip/${trip.id}`);
	};

	const list = useMemo(() => {
		const now = (new Date()).getTime();
		return Trips
			.filter((trip) => (trip.endTime.getTime() - now < 0) === showPast)
			.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
	}, [showPast, Trips]);

	return (
		<div className={cls.listContainer}>
			{!list.length &&
				<div className={cls.emptyLabel}>
					{isLoading ? <LoadingScreen /> : 'Пока ничего нет'}
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
