import { ReactNode } from 'react';
import cls from './style.module.scss';

interface IProps {
  children: ReactNode;
  onClose: () => void;
}

export const ModalWrapper = ({ children, onClose }: IProps) => {
	return (
		<div className={cls.fade} onClick={(e) => {e.stopPropagation(); onClose();}}>
			<div className={cls.modal} onClick={(e) => e.stopPropagation()} >
				<div className={cls.closeButton} onClick={onClose}> x </div>
				{children}
			</div>
		</div>
	);
};
