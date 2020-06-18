import { FormConfig } from 'shared/forms';

export type TemplateManagementConfig = {
  label: string;
  description: string;
  formConfig: FormConfig;
  progress?: number;
  status?: boolean;
}[];
