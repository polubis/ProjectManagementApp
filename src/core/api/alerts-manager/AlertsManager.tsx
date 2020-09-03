import React, { useState, useEffect, useCallback } from 'react';

import { Alert } from 'ui';

import { core } from '..';

const AlertsManager = () => {
  const [alerts, setAlerts] = useState<string[]>([]);

  const closeAlert: Alert.OnClose = useCallback((idx) => {
    setAlerts((prevAlerts) => prevAlerts.filter((_, aIdx) => aIdx !== idx));
  }, []);

  useEffect(() => {
    const addAlert = (err: string) => {
      setAlerts((prevAlerts) => [...prevAlerts, err]);
    };

    core.subscribe(addAlert);

    return core.unsubscribe;
  }, []);

  return (
    <>
      {alerts.map((alert, idx) => (
        <Alert key={idx} idx={idx} message={alert} type="error" onClose={closeAlert} />
      ))}
    </>
  );
};

export default AlertsManager;
