import { UseForm, FormSubmitEvent, FormConfig } from 'shared/forms';

import { StepStatus } from 'shared/ui';

export interface TemplateCreationStepConfig {
  label: string;
  description: string;
  formConfig: FormConfig;
  progress?: number;
  status?: StepStatus;
}

export interface TemplateCreationStepProps {
  formManager: UseForm;
  onSubmit(e: FormSubmitEvent): void;
}
