import { useEffect, useState } from 'react';
import { useCurrentTrip } from 'src/entities/Trip';
import { Switch } from 'src/shared/components/Switch';
import { INVITE_LINK_BASE } from 'src/shared/config';
import { useNotificationService } from 'src/shared/services/notifications';
import { copyTextToClipboard } from 'src/shared/utils';
import cls from './style.module.scss';

export const ShareForm = () => {
	const { inviteTokens } = useCurrentTrip();
	const { Notify } = useNotificationService();
	const [isEditor, setIsEditor] = useState(false);
	const [enabled, setEnabled] = useState(!!inviteTokens.readonly);

	useEffect(() => {
		setEnabled(!!inviteTokens[isEditor ? 'editor' : 'readonly']);
	}, [isEditor, inviteTokens]);

	const inviteLink = enabled
		? `${INVITE_LINK_BASE}${inviteTokens[isEditor ? 'editor' : 'readonly']}`
		: '';

	const handleCopyLink = async () => {
		const result = await copyTextToClipboard(inviteLink);
		
		Notify({
			error: !result,
			message: result ? 'Успешно скопировано' : 'Ошибка при копировании',
		});
	};
	
	return (
		<div className={cls.container}>
			<div className={cls.title}>
        Пригласить в поездку
			</div>

			<div className={cls.switchContainer}>
        Разрешить редактирование
				<Switch value={isEditor} onChange={setIsEditor} />
			</div>

			<div className={cls.switchContainer}>
				Включить ссылку
				<Switch value={enabled} onChange={setEnabled} />
			</div>

			<div className={cls.inputContainer}>
				<input
					className="shared-input"
					placeholder="Ссылка отключена"
					value={inviteLink}
					readOnly={true}
				/>
				{enabled &&
					<div className={cls.copyBtn} onClick={handleCopyLink}>
						K
					</div>
				}
			</div>

		</div>
	);
};
