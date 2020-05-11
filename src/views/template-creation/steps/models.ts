import { FormManager, FormSubmitEvent } from 'shared/forms';

export interface TemplateManagementStepProps {
  formManager: FormManager;
  onSubmit(e: FormSubmitEvent): void;
}
