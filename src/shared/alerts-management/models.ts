export interface AlertCloseEvent extends React.MouseEvent<SVGSVGElement, MouseEvent> {}

export type AlertTypes = 'warning' | 'error' | 'success' | 'info';

export interface AlertConfig {
  message: string;
  status: number;
  type: AlertTypes;
}

export interface AlertsManagerState {
  alerts: AlertConfig[];
}

export interface AlertProps {
  message: string;
  type: AlertTypes;
  idx: number;
  onClose(e: AlertCloseEvent): void;
}
