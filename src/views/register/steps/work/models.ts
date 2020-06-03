import { RegisterStepProps } from '..';

export interface WorkProps extends RegisterStepProps {
  onBack(): void;
  onSkip(): void;
}
