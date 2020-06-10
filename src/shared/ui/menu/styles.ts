import { makeStyles } from '@material-ui/core';

import { Palette } from 'styles';

export const useStyles = makeStyles({
  paper: {
    width: '300px',
    boxShadow: Palette.shadowPrimary,
    background: Palette.surfacePrimary,
    color: Palette.primary,
    marginTop: '2px',

    '& ul': {
      padding: '6px 0',

      '& label': {
        margin: 0,
        padding: '0 8px',

        '& > span:first-of-type': {
          padding: '12px'
        }
      }
    }
  }
});
