import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { sortEventsByTime } from 'src/entities/Event';
import { ITrip } from 'src/entities/Trip';
import { TripCard } from 'src/entities/Trip';
import { useCurrentUser, UserRole } from 'src/entities/User';
import { LoadingScreen } from 'src/shared/components/LoadingScreen';
import { useLoadTrips } from '../hooks/useLoadTrips';
import cls from './style.module.scss';

interface IProps {
	filter?: string,
	onCreateNewTrip?: () => void,
}

export const TripsList = ({ filter = '', onCreateNewTrip }: IProps) => {
	const { Trips, isLoading } = useLoadTrips();
	const { currentUser } = useCurrentUser();
	const navigate = useNavigate();
	
	const handleClick = (trip: ITrip) => {
		navigate(`/trip/${trip.id}`);
	};

	const list = useMemo(() => {
		const now = (new Date()).getTime();
		return Trips
			.filter((trip) => {
				const myUser = trip.users.find((u) => u.id === currentUser?.id);

				switch (filter) {
				case 'passed':
					return trip.endTime.getTime() - now < 0;
				case 'mine':
					return myUser?.role === UserRole.Owner;
				case 'shared':
					return myUser?.role !== UserRole.Owner;
				default:
					return trip.endTime.getTime() - now > 0;
				}
			})
			.sort(sortEventsByTime);
	}, [filter, Trips]);

	return (
		<div className={cls.listContainer}>
			{!list.length &&
				<div className={cls.emptyLabel}>
					{isLoading ? <LoadingScreen /> :
						<div className={cls.emptyContainer}>
							Пока ничего нет
							{!Trips.length && ['mine', ''].includes(filter) &&
								<button className="shared-button shared-button-positive" onClick={onCreateNewTrip}>
									Создайте свою первую поездку
								</button>
							}
						</div>
					}
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
