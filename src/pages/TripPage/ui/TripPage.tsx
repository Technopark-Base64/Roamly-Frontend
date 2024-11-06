import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Page404 } from 'src/pages/Page404';
import { CalendarWidget } from 'src/widgets/CalendarWidget';
import { MapWidget } from 'src/widgets/MapWidget';
import { PlacesList } from 'src/widgets/PlacesList';
import { RecomsList } from 'src/widgets/RecomsList';
import { ITrip, TripCard, useCurrentTrip } from 'src/entities/Trip';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
import { getTrip } from '../api/getTrip';
import cls from './style.module.scss';

type TMenu = 'places' | 'recoms' | 'calendar' | 'map';

interface ITab {
	menu: TMenu,
	label: string,
	element: ReactNode,
}

export const TripPage = () => {
	const location = useLocation();
	const { id } = useParams();
	const menu = location.hash.replace('#', '');

	const { currentTrip, setCurrentTrip } = useCurrentTrip();
	const { Notify } = useNotificationService();
	const navigate = useNavigate();

	const {
		data,
		error,
	} = useFetch<ITrip>(getTrip(id ?? ''));

	useEffect(() => {
		error && Notify({
			error: true,
			message: error,
		});
	}, [error]);

	useEffect(() => {
		data && setCurrentTrip(data);

		return () => setCurrentTrip(null);
	}, [data]);

	const tabs: ITab[] = [
		{
			menu: 'places',
			label: 'Места',
			element: <PlacesList places={currentTrip?.places ?? []} />,
		},
		{
			menu: 'recoms',
			label: 'Рекомендации',
			element: <RecomsList />,
		},
		{
			menu: 'calendar',
			label: 'Календарь',
			element: <CalendarWidget events={currentTrip?.events ?? []} />,
		},
		{
			menu: 'map',
			label: 'Карта',
			element: <MapWidget />,
		},
	];

	useEffect(() => {
		if (!tabs.find((item) => item.menu === menu))
			navigate(`${location.pathname}#places`, { replace: true });
	}, [menu]);

	if (error)
		return <Page404 />;

	return (
		<div className={cls.page}>
			{ currentTrip && <TripCard trip={currentTrip} /> }

			<div className={cls.buttonContainer}>
				{tabs.map((tab) => (
					<button
						className={`${cls.tab} ${menu === tab.menu && cls.tabActive}`}
						onClick={() => navigate(`${location.pathname}#${tab.menu}`)}
						key={tab.menu}
					>
						{tab.label}
					</button>
				))}
			</div>

			<div className={cls.content}>
				{ currentTrip && tabs.find((item) => item.menu === menu)?.element }
			</div>

		</div>
	);
};
