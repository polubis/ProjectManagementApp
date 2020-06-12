import { LogInPayload } from 'api';

export interface LoginFormProps {
  disabled: boolean;
  onSubmit(credentials: LogInPayload): void;
}
