import { Step } from 'shared/ui';
import { FieldConfig } from 'shared/forms';

export type TemplateCreationStep = Step & {
  description: string;
  placeholder?: string;
  formConfig: (FieldConfig & { placeholder?: string })[];
};
