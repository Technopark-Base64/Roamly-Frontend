import { TripsList } from '../../../widgets/TripsList';
import cls from './style.module.scss';

export const MainPage = () => {

	return (
		<div className={cls.page}>
			<div className={cls.titleContainer}>
				<div className={cls.title}>
					Мои поездки
				</div>
				<button className={cls.button}>
					Новая
				</button>
			</div>

			<TripsList />

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
