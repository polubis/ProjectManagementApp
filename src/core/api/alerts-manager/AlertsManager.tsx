import React, { useState, useEffect, useCallback } from 'react';

import { Alert } from 'ui';

import { core } from '..';

const AlertsManager = () => {
  const [alerts, setAlerts] = useState<string[]>([]);

  const closeAlert = useCallback((idx: number) => {
    setAlerts(prevAlerts => prevAlerts.filter((_, aIdx) => aIdx !== idx));
  }, []);

  useEffect(() => {
    const addAlert = (err: string) => {
      setAlerts(prevAlerts => [...prevAlerts, err]);
    };

    core.subscribe(addAlert);

    return core.unsubscribe;
  }, []);

  return (
    <>
      {alerts.map((alert, idx) => (
        <Alert key={idx} message={alert} type="error" onClose={() => closeAlert(idx)} />
      ))}
    </>
  );
};

export default AlertsManager;
