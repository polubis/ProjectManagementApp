export type AlertTypes = 'warning' | 'error' | 'success' | 'info';

export interface AlertProps {
  message: string;
  type?: AlertTypes;
  onClose(): void;
}
