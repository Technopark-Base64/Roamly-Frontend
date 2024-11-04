import cls from './style.module.scss';

interface IProps {
	message?: string,
}

export const LoadingScreen = ({ message }: IProps) => {
	return (
		<div className={cls.fade}>
			<div className={cls.content}>
				<div className={cls.lds_ring}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div>
					{ message }
				</div>
			</div>
		</div>
	);
};
