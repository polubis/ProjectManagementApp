import { FormConfig } from 'shared/forms';

import { StepStatus } from 'shared/ui';

export type TemplateManagementConfig = {
  label: string;
  description: string;
  formConfig: FormConfig;
  progress?: number;
  status?: StepStatus;
}[];
