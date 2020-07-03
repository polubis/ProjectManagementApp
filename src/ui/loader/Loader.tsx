import React from 'react';

import { CircularProgressProps, CircularProgress } from '@material-ui/core';

import csx from './Loader.scss';

namespace Loader {
  export interface Props extends CircularProgressProps {}
}

const Loader = (props: Loader.Props) => {
  return <CircularProgress {...props} className={csx.loader} />;
};

export default Loader;
