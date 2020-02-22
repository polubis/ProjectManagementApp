import { FormConfig } from 'shared/forms';

export interface RegisterStep {
  title: string;
  subTitle: string;
  path: string;
  formConfig: FormConfig;
}
