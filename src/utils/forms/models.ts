import { V } from '.';

// TODO MOVE THIS IMPLEMENTATION ALSO TO NAMESPACE AND MAKE SIMPLER TYPE DEFINITIONS

export type FormChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type FormSubmitEvent = React.ChangeEvent<HTMLFormElement>;

export interface FieldState {
  value: any;
  error: string;
  validation: V.Result[];
}

export interface FieldConfig {
  label: string;
  validators?: V.Fn[];
  value?: any;
}

export interface FormState {
  invalid: boolean;
  dirty: boolean;
  fields: FieldState[];
}

export type FormConfig = FieldConfig[];

export type ChangeHandler = (e: FormChangeEvent) => void;

export type DirectChangeHandler = (positions: number[], values: any[]) => void;

export type SubmitHandler = (e?: FormSubmitEvent) => boolean;

export type GetChangedField = (value: any, idx: number) => FieldState;

export type FormManagerBase = [
  FormState,
  React.Dispatch<React.SetStateAction<FormState>>,
  GetChangedField
];

export type FormManager = [FormState, ChangeHandler, DirectChangeHandler, SubmitHandler];
