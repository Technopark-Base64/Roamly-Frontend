import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ReactNode } from 'react';
import cls from './style.module.scss';

interface IProps {
  children: ReactNode;
  onClose: () => void;
	showCloseButton?: boolean;
}

export const ModalWrapper = ({ children, onClose, showCloseButton = true }: IProps) => {
	return (
		<div className={cls.fade} onClick={(e) => {e.stopPropagation(); onClose();}}>
			<div className={cls.modal} onClick={(e) => e.stopPropagation()} >
				{showCloseButton &&
					<div className={cls.closeButton} onClick={onClose}>
						<CloseOutlinedIcon/>
					</div>
				}
				{children}
			</div>
		</div>
	);
};
