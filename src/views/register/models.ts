import { FormConfig } from 'shared/forms';

export type RegisterConfig = {
  label: string;
  description: string;
  formConfig: FormConfig;
  progress?: number;
  status?: boolean;
}[];
