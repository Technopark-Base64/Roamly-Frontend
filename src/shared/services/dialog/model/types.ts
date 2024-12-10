import { ReactNode } from 'react';

export interface IDialog {
  icon?: ReactNode,
  text: string,
  subtext?: string,
  warning?: string,
  onAccept?: () => void;
  acceptText: string;
  onCancel?: () => void;
  cancelText?: string;
  isDangerous?: boolean;
}

export interface IDialogStorage {
  dialog: IDialog | null;
}
