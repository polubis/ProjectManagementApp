import React, { ReactNode } from 'react';

import { makeStyles } from '@material-ui/core';

import { Button, Loader, SelectBase } from 'ui';

import csx from './ControlButton.scss';

namespace ControlButton {
  export interface Props extends Partial<SelectBase.ChildrenInjectedProps> {
    children: ReactNode;
    value: { [key: string]: boolean };
  }
}

const useStyles = makeStyles({
  btn: {
    height: '100%',
    padding: 0,
    borderLeft: '1px solid rgba(51, 129, 225, 0.43)',
    borderRadius: 0,
  },
});

const getSelectedCount = (value: { [key: string]: boolean }) =>
  Object.values(value).filter((v) => v).length;

const ControlButton = ({
  children,
  loading,
  value,
  onClick,
}: ControlButton.Props) => {
  const classes = useStyles();

  const selectedCount = getSelectedCount(value);

  return (
    <Button
      className={`${classes.btn} ${csx.btn} ${
        selectedCount > 0 ? csx.active : ''
      }`}
      disabled={loading}
      theme="primaryTransparent"
      onClick={onClick}
    >
      {loading ? (
        <Loader size="small" />
      ) : (
        <>
          {children}
          <b>{selectedCount > 0 ? selectedCount : 'All'}</b>
        </>
      )}
    </Button>
  );
};

export default ControlButton;
