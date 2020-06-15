import { CheckboxProps } from '..';

export type SelectChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  checked?: boolean
) => void;

export interface SelectProps {
  label: string;
  items: CheckboxProps[];
  className?: string;
  openClass?: string;
  error?: string;
  placeholder?: string;
  onSelect: SelectChangeHandler;
}

export interface SelectMenuProps {
  onSelect: SelectChangeHandler;
}

export interface SelectItemDataProps {
  items: CheckboxProps[];
  onSelect: SelectChangeHandler;
}
