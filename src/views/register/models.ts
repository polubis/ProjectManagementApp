import { FormConfig } from 'utils';

export type RegisterConfig = {
  label: string;
  description: string;
  formConfig: FormConfig;
  progress?: number;
  status?: boolean;
}[];
