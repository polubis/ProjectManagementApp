import React, { useState, useEffect } from 'react';

import csx from './Alert.scss';

namespace Alert {
  export interface Props {
    message?: string;
    type?: 'warning' | 'error' | 'success' | 'info';
    className?: string;
    time?: number;
    display: boolean;
  }
}

const Alert = ({ message, type = 'error', className = "", display }: Alert.Props) => {
  return (
    <div className={`${csx.alert} ${!display && csx.hidden} ${csx[type]} ${className}`}>
      {message}
    </div>
  );
}


export default Alert;
