import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { ReactNode, useCallback, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Page404 } from 'src/pages/Page404';
import { CalendarWidget } from 'src/widgets/CalendarWidget';
import { MainWidget } from 'src/widgets/MainWidget';
import { MapWidget } from 'src/widgets/MapWidget';
import { PlacesList } from 'src/widgets/PlacesList';
import { ITrip, TripCard, useCurrentTrip } from 'src/entities/Trip';
import { useCurrentUser } from 'src/entities/User';
import { LoadingScreen } from 'src/shared/components/LoadingScreen';
import { useFetch } from 'src/shared/hooks/useFetch';
import { useNotificationService } from 'src/shared/services/notifications';
import { WebSocket } from 'src/shared/services/websocket';
import { IWebSocketMessage, WSActions } from 'src/shared/services/websocket/model/types';
import { getTrip } from '../api/getTrip';
import { useAutoSchedule } from '../hooks/useAutoShedule';
import cls from './style.module.scss';

type TMenu = 'main' | 'recoms' | 'myplaces' | 'calendar';

interface ITab {
	menu: TMenu[],
	icon?: ReactNode,
	label: string,
	element: ReactNode,
}

export const TripPage = () => {
	const location = useLocation();
	const { id } = useParams();
	const menu = location.hash.replace('#', '');

	const { currentTrip, setCurrentTrip, isOwner } = useCurrentTrip();
	const { currentUser } = useCurrentUser();
	const { Notify } = useNotificationService();
	const navigate = useNavigate();
	const { scheduleLoading, AutoSchedule } = useAutoSchedule();

	const {
		data,
		error,
		refetch,
	} = useFetch<ITrip>(getTrip(id ?? ''));

	useEffect(() => {
		data && setCurrentTrip(data);

		return () => setCurrentTrip(null);
	}, [data]);

	const handleWebsocket = useCallback((message: IWebSocketMessage) => {
		const actions = [WSActions.PlacesUpdate, WSActions.EventsUpdate, WSActions.UsersUpdate];
		if (message.trip_id !== id)
			return;

		if ((actions.includes(message.action) && +message.author !== currentUser?.id)
				|| message.action === WSActions.TripUpdate) {
			refetch();
			Notify({
				error: false,
				message: message.message,
			});
		}
	}, [currentUser]);

	useEffect(() => {
		WebSocket.subscribe(handleWebsocket);

		return () => WebSocket.unsubscribe(handleWebsocket);
	}, [handleWebsocket]);

	const tabs: ITab[] = [
		{
			menu: ['main'],
			icon: <HomeOutlinedIcon className={cls.icon} />,
			label: 'Обзор',
			element: <MainWidget />,
		},
		{
			menu: ['recoms', 'myplaces'],
			icon: <PlaceOutlinedIcon className={cls.icon} />,
			label: 'Места',
			element: <PlacesList />,
		},
		{
			menu: ['calendar'],
			icon: <CalendarMonthOutlinedIcon className={cls.icon} />,
			label: 'Календарь',
			element: <CalendarWidget events={currentTrip?.events ?? []} />,
		},
	];

	useEffect(() => {
		if (!tabs.find((item) => item.menu.includes(menu as TMenu)))
			navigate(`${location.pathname}#main`, { replace: true });
	}, [menu]);

	if (error)
		return <Page404 />;

	return (
		<div className={cls.page}>
			<TripCard trip={currentTrip} isTripPage={true} onAutoScheduleClick={isOwner ? AutoSchedule : undefined} />

			<div className={cls.buttonContainer}>
				{tabs.map((tab) => (
					<button
						className={`${cls.tab} ${tab.menu.includes(menu as TMenu) && cls.tabActive}`}
						onClick={() => navigate(`${location.pathname}#${tab.menu[0]}`)}
						key={tab.menu[0]}
					>
						{tab.icon}{tab.label}
					</button>
				))}
			</div>

			{!scheduleLoading &&
				<div className={cls.content}>
					<div className={cls.wrapper}>
						{ currentTrip && tabs.find((item) => item.menu.includes(menu as TMenu))?.element }
						{ menu !== 'calendar' && <MapWidget showCircle={menu === 'recoms'} /> }
					</div>
				</div>
			}

			{scheduleLoading &&
				<LoadingScreen message="Ваша поездка готовится, пожалуйста, подождите" />
			}
		</div>
	);
};
