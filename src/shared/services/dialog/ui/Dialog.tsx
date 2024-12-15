import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { ModalWrapper } from '../../../components/ModalWrapper';
import { useDialogService } from '../hooks/useDialogService';
import { getDialog } from '../model/selectors/getDialog';
import cls from './style.module.scss';

export const Dialog = () => {
	const dialog = useSelector(getDialog);
	const { CloseDialog } = useDialogService();

	const handleAccept = () => {
		dialog?.onAccept?.();
		CloseDialog();
	};

	const handleCancel = () => {
		dialog?.onCancel?.();
		CloseDialog();
	};

	const Icon = dialog?.icon;

	return dialog && (
		<ModalWrapper onClose={handleCancel} showCloseButton={false}>
			<div className={cls.content}>
				<div className={cls.icon}>
					{ Icon ?? <InfoOutlinedIcon /> }
				</div>
				<div className={cls.text}>
					{dialog.text}
				</div>
				{dialog.subtext &&
					<div className={cls.subtext}>
						{dialog.subtext}
					</div>
				}
				{dialog.warning &&
					<div className={cls.warning}>
						{dialog.warning}
					</div>
				}
				<div className={cls.buttonContainer}>
					<button className={`shared-button shared-button-${dialog.isDangerous ? 'negative' : 'positive'}`} onClick={handleAccept}>
						{dialog.acceptText}
					</button>
					{dialog.cancelText &&
						<button className="shared-button" onClick={handleCancel}>
							{dialog.cancelText}
						</button>
					}
				</div>
			</div>
		</ModalWrapper>
	);
};
