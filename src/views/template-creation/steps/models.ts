import { FormManager, FormSubmitEvent } from 'shared/forms';

export interface TemplateManagementStepProps {
  formManager: FormManager;
  pending?: boolean;
  onSubmit(e: FormSubmitEvent): void;
}
