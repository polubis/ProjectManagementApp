import { Form } from 'utils';

export interface RegisterStepProps {
  formManager: Form.Manager;
  onSubmit(e: Form.Events.Submit): void;
}
