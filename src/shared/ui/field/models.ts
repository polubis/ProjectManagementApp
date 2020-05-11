export interface FieldBaseProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
}

export interface FieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  className?: string;
  error?: string;
}

export interface TextareaFieldProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  className?: string;
  error?: string;
}
