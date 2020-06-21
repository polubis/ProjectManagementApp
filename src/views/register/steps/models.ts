import { FormManager, FormSubmitEvent } from 'utils';

export interface RegisterStepProps {
  formManager: FormManager;
  onSubmit(e: FormSubmitEvent): void;
}
