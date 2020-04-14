export type StepClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export interface Step {
  label: string;
  content?: React.ReactNode;
}

export interface StepsProps {
  activeStep: number;
  steps: Step[];
  onStepClick(event: StepClickEvent): void;
}
