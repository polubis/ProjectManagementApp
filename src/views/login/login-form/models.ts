import { LogInPayload } from 'api';

export interface LoginFormProps {
  isDisabled: boolean;
  onSubmit(credentials: LogInPayload): void;
}
