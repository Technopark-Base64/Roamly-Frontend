import { useCurrentUser } from 'src/entities/User';
import cls from './style.module.scss';

export const Navbar = () => {
	const { currentUser } = useCurrentUser();

	return (
		<div className={cls.navbar}>
			<div className={cls.logo}>
        Roamly
			</div>

			{currentUser &&
				<div className={cls.user}>
					{currentUser.imageUrl ?
						<></> :
						<div className={cls.avatarMock} />
					}
					<div>{currentUser.login} </div>
				</div>
			}
		</div>
	);2;
};