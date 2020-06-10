import { MenuProps as MuiMenuProps } from '@material-ui/core';

export interface MenuProps extends Omit<MuiMenuProps, 'open'> {
  id: string;
  anchorEl: Element;
  items: any[];
  onSelect(event: React.ChangeEvent<HTMLInputElement>, checked?: boolean): void;
  onClose(): void;
}

export interface MenuItemProps {
  style: React.CSSProperties;
  index: number;
  data: {
    items: any[];
    onSelect: (event: React.ChangeEvent<HTMLInputElement>, checked?: boolean) => void;
  };
}
