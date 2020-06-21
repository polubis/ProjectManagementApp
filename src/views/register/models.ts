import { Form } from 'utils';

export type RegisterConfig = {
  label: string;
  description: string;
  formConfig: Form.Config;
  progress?: number;
  status?: boolean;
}[];
