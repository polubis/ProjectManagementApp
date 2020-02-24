import { Palette } from 'styles';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant: 'filled';
  bg?: keyof typeof Palette;
  color?: keyof typeof Palette;
}
