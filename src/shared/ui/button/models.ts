export type ButtonVariants = 'outlined' | 'filled';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant: ButtonVariants;
}

export type ButtonVariantsMap = {
  [key in ButtonVariants]: string;
};
