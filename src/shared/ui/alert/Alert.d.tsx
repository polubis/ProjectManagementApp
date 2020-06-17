export type AlertTypes = 'warning' | 'error' | 'success' | 'info';

export type AlertProps = {
  message: string;
  type?: AlertTypes;
  onClose(): void;
};
