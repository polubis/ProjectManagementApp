import { ComponentType } from 'react';
import { ListChildComponentProps } from 'react-window';

import { PopoverOrigin } from '@material-ui/core';

type BaseMenuProps<T> = {
  id: string;
  anchorEl: Element;
  items: T[];
  children: ComponentType<ListChildComponentProps>;
  onClose(): void;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  width?: number;
  height?: number;
  itemSize?: number;
};

export type MenuProps<T, R> = BaseMenuProps<T> & R;

export interface MenuItemProps<T> extends Omit<ListChildComponentProps, 'data'> {
  data: T;
}

export interface MuiMenuStyleProps {
  width: number;
}
