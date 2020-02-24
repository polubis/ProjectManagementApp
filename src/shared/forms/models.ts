export class Validation {
  constructor(public isInvalid: boolean, public text: string) {}
}

export type Validator = (value: string, label: string) => Validation;

export type FormChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type FormSubmitEvent = React.ChangeEvent<HTMLFormElement>;

export interface FieldState {
  value: string;
  error: string;
  validation: Validation[];
}

export interface FieldConfig {
  label: string;
  validators?: Validator[];
  value?: string;
}

export interface FormState {
  isInvalid: boolean;
  isDirty: boolean;
  fields: FieldState[];
}

export type FormConfig = FieldConfig[];

export type ChangeHandler = (e: FormChangeEvent) => void;

export type SubmitHandler = (e: FormSubmitEvent) => boolean;

export type GetChangedField = (value: string, idx: number) => FieldState;

export type UseFormBase = [
  FormState,
  React.Dispatch<React.SetStateAction<FormState>>,
  GetChangedField
];

export type UseForm = [FormState, ChangeHandler, SubmitHandler];
