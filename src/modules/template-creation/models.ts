import { Form } from 'utils';

export type TemplateManagementConfig = {
  label: string;
  description: string;
  formConfig: Form.Config;
  progress?: number;
  status?: boolean;
}[];
