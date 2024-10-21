import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripsList } from 'src/widgets/TripsList';
import { useCurrentUser } from 'src/entities/User';
import { ModalWrapper } from 'src/shared/components/ModalWrapper/ui/ModalWrapper';
import cls from './style.module.scss';

export const MainPage = () => {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const { currentUser } = useCurrentUser();

	useEffect(() => {
		if (!currentUser) {
			navigate('/login');
		}
	}, [currentUser]);


	return (
		<div className={cls.page}>

			<div className={cls.content}>
				<div className={cls.titleContainer}>
					<div className={cls.title}>
						Мои поездки
					</div>

					<div>
						<button className="shared-button" onClick={() => setShowModal(true)} >
							Новая
						</button>
					</div>
				</div>

				<TripsList />
			</div>

			<div className={cls.menu}>
				<button className="shared-button"> Активные </button>
				<button className="shared-button"> Прошедшие </button>
			</div>

			{showModal &&
				<ModalWrapper onClose={() => setShowModal(false)} >
					Hello!
				</ModalWrapper>
			}

		</div>
	);
};








// const [places, setPlaces] = useState();
// const [regions, setRegions] = useState();
//
// useEffect(() => {
// 	searchRegions('Москва').then((res) => {
// 		setRegions(res);
// 	});
// }, []);
//
// useEffect(() => {
// 	if (regions?.length) {
// 		searchPlaces(regions[0], 'Парки').then((res) => {
// 			setPlaces(res);
// 		});
// 	}
// }, [regions]);
//
// return (
// 	<div className={cls.page}>
// 		<div className={cls.title}>
// 			Hello from Roamly!
// 		</div>
// 		<div>
// 			{regions?.map((pl: any) => {
// 				console.log(pl);
// 				return (
// 					<div key={pl.place_id}>
// 						{pl.name}
// 						<img src={getPlacePhoto(pl.photos[0])} alt=""/>
// 					</div>
// 				);
// 			})}
// 		</div>
// 		<div>
// 			{places?.map((pl: any) => {
// 				return (
// 					<div key={pl.place_id}>
// 						{pl.name}
// 						<img src={getPlacePhoto(pl.photos[0])} alt=""/>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	</div>
// );
