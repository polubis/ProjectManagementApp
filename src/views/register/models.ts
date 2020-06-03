import { FormConfig } from 'shared/forms';

import { StepStatus } from 'shared/ui';

export type RegisterConfig = {
  label: string;
  description: string;
  formConfig: FormConfig;
  progress?: number;
  status?: StepStatus;
}[];
