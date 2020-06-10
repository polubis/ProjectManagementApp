import { MenuProps } from '@material-ui/core';

export const menuConfig: Partial<MenuProps> = {
  getContentAnchorEl: null,
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  transformOrigin: { vertical: 'top', horizontal: 'left' }
};
