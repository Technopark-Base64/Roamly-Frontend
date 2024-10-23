import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITrip } from 'src/entities/Trip';
import { TripCard } from 'src/entities/Trip';
import { useCurrentTrip } from 'src/entities/Trip';
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
		data && setTrips(data);
	}, [data]);
	
	const handleClick = (trip: ITrip) => {
		setCurrentTrip(trip); // TODO Delete
		navigate(`/trip/${trip.id}#places`);
	};

	const list = useMemo(() => {
		const now = (new Date()).getTime();
		return trips.filter((trip) => (trip.endTime.getTime() - now < 0) === showPast);
	}, [showPast]);

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
					key={trip.area.placeId}
					onClick={() => handleClick(trip)}
				/>
			))}

		</div>
	);
};


//
// // TODO DELETE MOCK DATA
// const MoscowTrip: ITrip = {
// 	area: {
// 		'formattedAddress': 'Москва, Россия',
// 		'location': {
// 			'lat': 55.755826,
// 			'lng': 37.6172999
// 		},
// 		'name': 'Москва',
// 		'photos': [
// 			'AdCG2DMe00ooqww70q7KHDAaE8uviGiv4to7WYQd-N8dpPdoL9xzolPq6SKNbJTBSxVgTRk9lxmLMsIShJIOuOs3SmgMp6uwDFqx8tTnakC5NlF5UqYuhJTEZpD7P2gbJpZ6DZ4H4aOScPyKHToB_xfzykBXd6cFsjaLyONI9-qk_CpESG5G'
// 		],
// 		'placeId': 'ChIJybDUc_xKtUYRTM9XV8zWRD0',
// 		'types': [
// 			'locality',
// 			'political'
// 		]
// 	},
// 	id: 'WEsdKJJHJgjhdJHGhks',
// 	startTime: new Date('2024-10-13T11:30:00Z'),
// 	endTime: new Date('2024-11-15T11:30:00Z'),
// 	places: [],
// 	users: [],
// 	events: [],
// };
//
// const PeterTrip: ITrip = {
// 	area: {
// 		'formattedAddress': 'Санкт-Петербург, Россия',
// 		'location': {
// 			'lat': 59.9310584,
// 			'lng': 30.3609096
// 		},
// 		'name': 'Санкт-Петербург',
// 		'photos': [
// 			'AdCG2DPRCVhDJTnyuHpFX6JMlAS01C7zxZbP4fXnFSyIxKiB-7CTByINJaAWiT5JFEjxIc628MYZU9zskEZKsHqpo5C88zhk0JEx-P7h2JhjEOn4KLY3Qlt_mvE1XBWESTP4-8PLXASOuTE-NTs6tQHtrw63dQv5AA9AlhDPFopwpwqst8NH'
// 		],
// 		'placeId': 'ChIJ7WVKx4w3lkYR_46Eqz9nx20',
// 		'types': [
// 			'locality',
// 			'political'
// 		]
// 	},
// 	id: 'yuHpFX6JMlAS01C7zxZbP4fXnFSyIx',
// 	startTime: new Date('2024-12-13T11:30:00Z'),
// 	endTime: new Date('2024-12-13T11:30:00Z'),
// 	places: [],
// 	users: [],
// 	events: [],
// };
//
// const MoscowPastTrip: ITrip = {
// 	area: {
// 		'formattedAddress': 'Москва, Россия',
// 		'location': {
// 			'lat': 55.755826,
// 			'lng': 37.6172999
// 		},
// 		'name': 'Москва',
// 		'photos': [
// 			'AdCG2DMe00ooqww70q7KHDAaE8uviGiv4to7WYQd-N8dpPdoL9xzolPq6SKNbJTBSxVgTRk9lxmLMsIShJIOuOs3SmgMp6uwDFqx8tTnakC5NlF5UqYuhJTEZpD7P2gbJpZ6DZ4H4aOScPyKHToB_xfzykBXd6cFsjaLyONI9-qk_CpESG5G'
// 		],
// 		'placeId': 'ChIJybDUc_xKtUYRTM9XV8zWRD0',
// 		'types': [
// 			'locality',
// 			'political'
// 		]
// 	},
// 	id: 'WEsdKJJHJgjhdJHGhks',
// 	startTime: new Date('2023-11-13T11:30:00Z'),
// 	endTime: new Date('2023-11-15T11:30:00Z'),
// 	places: [],
// 	users: [],
// 	events: [],
// };

