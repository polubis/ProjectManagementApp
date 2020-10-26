import React, { useState, useEffect, useCallback } from 'react';

import { Alert } from 'ui';

import { core } from '..';

const AlertsManager = () => {
  const [alert, setAlert] = useState('');

  const closeAlert = useCallback(() => {
    setAlert('');
  }, []);

  useEffect(() => {
    core.subscribe(setAlert);

    return core.unsubscribe;
  }, []);

  return alert ? <Alert message={alert} display={true} /> : null;
};

export default AlertsManager;
