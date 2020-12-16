import React, { useState, useEffect, useCallback } from 'react';

import { Alert } from 'ui';

import { core } from 'shared/instances';

const AlertsManager = (): JSX.Element => {
  const [alert, setAlert] = useState('');

  const closeAlert = useCallback(() => {
    setAlert('');
  }, []);

  useEffect(() => {
    core.subscribe(setAlert);

    return () => {
      core.unsubscribe();
    };
  }, []);

  return alert ? <Alert message={alert} onClose={closeAlert} /> : null;
};

export default AlertsManager;
