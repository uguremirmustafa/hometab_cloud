import { ReactNode } from 'react';

export interface ModalProps {
  id: string | null;
  title?: string;
  content?: ReactNode;
  maxWidth?: string;
  type?: 'modal' | 'sidebar';
  maxHeight?: string;
  handleClose?: (paramater?: unknown) => void;
  className?: string;
}
