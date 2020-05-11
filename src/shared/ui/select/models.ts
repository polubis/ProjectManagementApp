export interface SelectItem {
  id: number;
  label: string;
  value: boolean;
}

export interface SelectProps {
  label: string;
  items: SelectItem[];
  error?: string;
  placeholder?: string;
  onSelect(event: React.ChangeEvent<HTMLInputElement>, checked?: boolean): void;
}
