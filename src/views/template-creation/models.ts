import { FormConfig } from 'shared/forms';

import { Steps } from 'shared/ui';

export type TemplateManagementConfig = {
  label: string;
  description: string;
  formConfig: FormConfig;
  progress?: number;
  status?: Steps.ItemStatus;
}[];
