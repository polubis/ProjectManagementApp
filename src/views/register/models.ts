import { FormConfig } from 'shared/forms';

import { Steps } from 'shared/ui';

export type RegisterConfig = {
  label: string;
  description: string;
  formConfig: FormConfig;
  progress?: number;
  status?: Steps.ItemStatus;
}[];
