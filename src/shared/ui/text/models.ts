import { Palette } from 'styles';

export enum TextVariants {
  heading = 'h5',
  subHeading = 'span',
  description = 'span',
  label = 'label'
}

export interface TextProps {
  children: React.ReactNode;
  variant: keyof typeof TextVariants;
  color?: keyof typeof Palette;
}
