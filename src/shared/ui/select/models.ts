import { Checkbox } from '..';

export type SelectChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  checked?: boolean
) => void;

export interface SelectProps {
  label: string;
  items: Checkbox.Props[];
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
  items: Checkbox.Props[];
  onSelect: SelectChangeHandler;
}
