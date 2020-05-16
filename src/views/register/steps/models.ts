import { FormManager, FormSubmitEvent } from 'shared/forms';

export interface RegisterStepProps {
  formManager: FormManager;
  onSubmit(e: FormSubmitEvent): void;
}
