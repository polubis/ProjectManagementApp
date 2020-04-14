import { Step } from 'shared/ui';
import { FormConfig } from 'shared/forms';

export type TemplateCreationConfig = (Step & {
  description: string;
  formConfig: FormConfig;
})[];

export interface TemplateCreationStepProps {
  config: FormConfig;
  onSubmit(): void;
}
