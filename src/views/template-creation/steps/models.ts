import { FormManager, FormSubmitEvent } from 'utils';

export interface TemplateManagementStepProps {
  formManager: FormManager;
  pending?: boolean;
  onSubmit(e: FormSubmitEvent): void;
}
