import React, { FC } from 'react';

import { Action } from '../action';

import csx from './ErrorAction.scss';

const ErrorAction: FC<Action.Props> = (props) => {
  return <Action {...props} className={`${props.className} ${csx.errorAction}`} />;
};

ErrorAction.defaultProps = {
  className: '',
};

export default ErrorAction;
