import { Form } from 'utils';

export interface TemplateManagementStepProps {
  formManager: Form.Manager;
  pending?: boolean;
  onSubmit(e: Form.Events.Submit): void;
}
