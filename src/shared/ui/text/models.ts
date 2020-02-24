import { Palette } from 'styles';

export interface TextProps {
  children: React.ReactNode;
  color?: keyof typeof Palette;
}