import { FormChangeEvent } from 'shared/forms';

export interface DateFieldProps {
  label: string;
  value: string;
  error?: string;
  onSelect(value: string): void;
  onChange(e: FormChangeEvent): void;
}
