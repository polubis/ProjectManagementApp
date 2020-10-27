import React, { useState, useEffect } from 'react';

import csx from './Alert.scss';

namespace Alert {
  export interface Props {
    message?: string;
    type?: 'warning' | 'error' | 'success' | 'info';
    className?: string;
    time?: number;
  }
}

const Alert = ({ message, type = 'error', className = "", time = 5000 }: Alert.Props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    hide();
  }, [])

  const hide = async () => {
    await sleep(time - 1000);
    setShow(false);
  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  return (
    <div className={`${csx.alert} ${!show && csx.hidden} ${csx[type]} ${className}`}>
      {message}
    </div>
  );
}


export default Alert;
