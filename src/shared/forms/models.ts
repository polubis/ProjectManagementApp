export class Validation {
  constructor(public isInvalid: boolean, public text: string) {}
}

export type Validator = (value: any, label: string) => Validation;

export type FormChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type FormSubmitEvent = React.ChangeEvent<HTMLFormElement>;

export interface FieldState {
  value: any;
  error: string;
  validation: Validation[];
}

export interface FieldConfig {
  label: string;
  validators?: Validator[];
  value?: any;
}

export interface FormState {
  isInvalid: boolean;
  isDirty: boolean;
  fields: FieldState[];
}

export type FormConfig = FieldConfig[];

export type ChangeHandler = (e: FormChangeEvent) => void;

export type DirectChangeHandler = (positions: number[], values: any[]) => void;

export type SubmitHandler = (e?: FormSubmitEvent) => boolean;

export type GetChangedField = (value: any, idx: number) => FieldState;

export type UseFormBase = [
  FormState,
  React.Dispatch<React.SetStateAction<FormState>>,
  GetChangedField
];

export type UseForm = [FormState, ChangeHandler, DirectChangeHandler, SubmitHandler];
