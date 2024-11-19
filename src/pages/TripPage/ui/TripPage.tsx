import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Page404 } from 'src/pages/Page404';
import { CalendarWidget } from 'src/widgets/CalendarWidget';
import { MainWidget } from 'src/widgets/MainWidget';
import { MapWidget } from 'src/widgets/MapWidget';
import { PlacesList } from 'src/widgets/PlacesList';
import { RecomsList } from 'src/widgets/RecomsList';
import { ITrip, TripCard, useCurrentTrip } from 'src/entities/Trip';
import { useCurrentUser } from 'src/entities/User';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
import { WebSocket } from 'src/shared/services/websocket';
import { IWebSocketMessage, WSActions } from 'src/shared/services/websocket/model/types';
import { getTrip } from '../api/getTrip';
import cls from './style.module.scss';

type TMenu = 'main' | 'recoms' | 'calendar' |'places';

interface ITab {
	menu: TMenu,
	icon?: ReactNode,
	label: string,
	element: ReactNode,
}

export const TripPage = () => {
	const location = useLocation();
	const { id } = useParams();
	const menu = location.hash.replace('#', '');

	const { currentTrip, setCurrentTrip } = useCurrentTrip();
	const { currentUser } = useCurrentUser();
	const { Notify } = useNotificationService();
	const navigate = useNavigate();

	const {
		data,
		error,
		refetch,
		isFetching,
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

	const handleWebsocket = (message: IWebSocketMessage) => {
		const actions = [WSActions.TripUpdate, WSActions.PlacesUpdate, WSActions.EventsUpdate, WSActions.UsersUpdate];
		if (message.trip_id !== id)
			return;

		if (actions.includes(message.action) && message.author !== currentUser?.id) {
			refetch();
			Notify({
				error: false,
				message: message.message,
			});
		}
	};

	useEffect(() => {
		WebSocket.subscribe(handleWebsocket);

		return () => WebSocket.unsubscribe(handleWebsocket);
	}, []);

	const tabs: ITab[] = [
		{
			menu: 'main',
			icon: <HomeOutlinedIcon className={cls.icon} />,
			label: 'Главная',
			element: <MainWidget />,
		},
		{
			menu: 'recoms',
			icon: <RecommendOutlinedIcon className={cls.icon} />,
			label: 'Рекомендации',
			element: <RecomsList />,
		},
		{
			menu: 'calendar',
			icon: <CalendarMonthOutlinedIcon className={cls.icon} />,
			label: 'Календарь',
			element: <CalendarWidget events={currentTrip?.events ?? []} />,
		},
		{
			menu: 'places',
			icon: <PlaceOutlinedIcon className={cls.icon} />,
			label: 'Места',
			element: <PlacesList places={currentTrip?.places ?? []} />,
		},
	];

	useEffect(() => {
		if (!tabs.find((item) => item.menu === menu))
			navigate(`${location.pathname}#main`, { replace: true });
	}, [menu]);

	if (error)
		return <Page404 />;

	return (
		<div className={cls.page}>
			<TripCard trip={currentTrip} isTripPage={true} />

			<div className={cls.buttonContainer}>
				{tabs.map((tab) => (
					<button
						className={`${cls.tab} ${menu === tab.menu && cls.tabActive}`}
						onClick={() => navigate(`${location.pathname}#${tab.menu}`)}
						key={tab.menu}
					>
						{tab.icon}{tab.label}
					</button>
				))}
			</div>

			{!isFetching &&
				<div className={cls.content}>
					<div className={cls.wrapper}>
						{ currentTrip && tabs.find((item) => item.menu === menu)?.element }
						{ menu !== 'calendar' && <MapWidget showCircle={menu !== 'main'} /> }
					</div>
				</div>
			}
		</div>
	);
};
