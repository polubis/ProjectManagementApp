export interface StepperProps {
  activeIdx: number;
  children: [React.ReactElement, React.ReactElement];
  onStepChange: (idx: number) => void;
}

export interface StepperContentProps {
  children: React.ReactElement[];
}

export interface StepperNavProps {
  children: React.ReactElement[];
}

export interface InjectedStepperProps {
  activeIdx: number;
  onStepChange: (idx: number) => void;
}

export interface InjectedStepProps {
  idx: number;
  isActive: boolean;
  onStepChange: (idx: number) => void;
}
