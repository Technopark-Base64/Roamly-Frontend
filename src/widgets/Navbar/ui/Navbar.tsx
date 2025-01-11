import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/features/Authorization';
import { useCurrentUser } from 'src/entities/User';
// import { getUserAvatarColor } from 'src/entities/User';
import { useDialogService } from 'src/shared/services/dialog';
import cls from './style.module.scss';

export const Navbar = () => {
	const { currentUser } = useCurrentUser();
	const { OpenDialog } = useDialogService();
	const { Logout } = useAuth({});
	const location = useLocation();
	const navigate = useNavigate();

	// const avatarStyle = {
	// 	backgroundColor: currentUser?.id ? getUserAvatarColor(currentUser) : '',
	// };

	const handleLogoClick = () => {
		if (location.pathname === '/login')
			return;

		navigate('/');
	};

	const handleLogout = async () => {
		localStorage.setItem('redirectAfterLogin', window.location.pathname);

		OpenDialog({
			text: 'Выход из профиля',
			subtext: 'Вы уверены, что хотите выйти из аккаунта?',
			onAccept: Logout,
			acceptText: 'Выход',
			cancelText: 'Отмена',
		});
	};

	return (
		<div className={cls.navbar}>
			<div className={cls.logo} onClick={handleLogoClick}>
				<img src="/logo.png" alt="logo" className={cls.logoIcon} />
				Roamly
			</div>

			{!!currentUser?.id &&
				<div className={cls.user}>
					{currentUser.imageUrl ?
						<></> :
						<AccountCircleOutlinedIcon className={cls.avatarIcon} />
						// <div className={cls.avatar} style={avatarStyle} />
					}
					<div>{currentUser.login}</div>
					<button className="shared-icon-button" onClick={handleLogout}>
						<LogoutOutlinedIcon />
					</button>
				</div>
			}
		</div>
	);
};