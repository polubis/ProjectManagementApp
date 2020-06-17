export enum StepStatus {
  VALID = 'valid',
  INVALID = 'invalid'
}

export interface Step {
  label: string;
  progress?: number;
  status?: StepStatus;
  content?: React.ReactNode;
}

export interface StepsProps {
  steps: Step[];
}
