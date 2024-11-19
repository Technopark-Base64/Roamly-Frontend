import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { useState } from 'react';
import { Switch } from 'src/shared/components/Switch';
import { useNotificationService } from 'src/shared/services/notifications';
import { copyTextToClipboard } from 'src/shared/utils';
import { useShareForm } from '../hooks/useShareForm';
import cls from './style.module.scss';

export const ShareForm = () => {
	const { Notify } = useNotificationService();
	const [isEditor, setIsEditor] = useState(false);
	const [enabled, setEnabled] = useState(false);

	const { inviteLink, CreateToken, DeleteToken } = useShareForm({ isEditor, setEnabled });

	const handleCopyLink = async () => {
		const result = await copyTextToClipboard(inviteLink);
		
		Notify({
			error: !result,
			message: result ? 'Успешно скопировано' : 'Ошибка при копировании',
		});
	};

	const handleSwitchEnable = async (ena: boolean) => {
		if (ena) {
			await CreateToken();
		} else {
			await DeleteToken();
		}
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
				<Switch value={enabled} onChange={handleSwitchEnable} />
			</div>

			<div className={cls.inputContainer}>
				<input
					className="shared-input"
					placeholder="Ссылка отключена"
					value={enabled ? inviteLink : ''}
					readOnly={true}
				/>
				{enabled &&
					<div className={cls.copyBtn} onClick={handleCopyLink}>
						<ContentPasteOutlinedIcon />
					</div>
				}
			</div>

		</div>
	);
};
