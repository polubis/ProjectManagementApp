import { RegisterStepProps } from '..';

export interface PersonalInfoProps extends RegisterStepProps {
  onBack(): void;
  onSkip(): void;
}
