import { FormConfig } from 'utils';

export type TemplateManagementConfig = {
  label: string;
  description: string;
  formConfig: FormConfig;
  progress?: number;
  status?: boolean;
}[];
