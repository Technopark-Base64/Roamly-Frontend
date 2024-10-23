import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/features/Authorization';
import { useCurrentUser } from 'src/entities/User';
import cls from './style.module.scss';

export const Navbar = () => {
	const { currentUser } = useCurrentUser();
	const { Logout } = useAuth({});
	const navigate = useNavigate();

	const handleLogoClick = () => {
		navigate('/');
	};

	const handleLogout = async () => {
		await Logout();
	};

	return (
		<div className={cls.navbar}>
			<div className={cls.logo} onClick={handleLogoClick}>
        Roamly
			</div>

			{currentUser &&
				<div className={cls.user}>
					{currentUser.imageUrl ?
						<></> :
						<div className={cls.avatarMock} />
					}
					<div>{currentUser.login}</div>
					<button className="shared-button" onClick={handleLogout}>
						Выход
					</button>
				</div>
			}
		</div>
	);
};