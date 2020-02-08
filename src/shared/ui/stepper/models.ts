export interface StepProps {
  title: string;
  progress?: number;
  children: JSX.Element;
}

export interface StepperProps {
  step: number;
  onStepChange: (idx: number) => void;
  children: React.ReactNode;
}
