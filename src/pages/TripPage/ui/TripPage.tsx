import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Page404 } from 'src/pages/Page404';
import { EventsList } from 'src/widgets/EventsList';
import { PlacesList } from 'src/widgets/PlacesList';
import { TripCard, useCurrentTrip } from 'src/entities/Trip';
import { useCurrentUser } from 'src/entities/User';
import cls from './style.module.scss';

type TMenu = 'places' | 'calendar';

interface ITab {
	menu: TMenu,
	label: string,
	element: ReactNode,
}

export const TripPage = () => {
	const location = useLocation();
	const hash = location.hash.replace('#', '');

	const [menu, setMenu] = useState<TMenu>('places');
	const { currentTrip } = useCurrentTrip();
	const { currentUser } = useCurrentUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate('/login');
		}
	}, [currentUser]);

	useEffect(() => {
		switch (hash) {
		case 'places':
			setMenu('places');
			break;
		case 'calendar':
			setMenu('calendar');
			break;
		default:
			setMenu('places');
		}
	}, [hash]);

	const tabs: ITab[] = [
		{
			menu: 'places',
			label: 'Места',
			element: <PlacesList places={currentTrip?.places ?? []} />,
		},
		{
			menu: 'calendar',
			label: 'Календарь',
			element: <EventsList events={currentTrip?.events ?? []} />,
		},
	];

	if (!currentTrip)
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
				{ tabs.find((item) => item.menu === menu)?.element }
			</div>

		</div>
	);
};
