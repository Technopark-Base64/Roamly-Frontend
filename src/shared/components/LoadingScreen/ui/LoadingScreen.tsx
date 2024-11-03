import cls from './style.module.scss';

export const LoadingScreen = () => {
	return (
		<div className={cls.fade}>
			<div className={cls.lds_ring}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
