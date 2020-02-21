export interface InjectedStepProps {
  idx: number;
  isActive: boolean;
  onStepChange: (idx: number) => void;
}

export interface StepProps {
  children: React.ReactElement;
  content?: boolean;
}

export interface StepperProps {
  activeIdx: number;
  children: React.ReactNode;
  onStepChange: (idx: number) => void;
}
