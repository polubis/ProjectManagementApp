import React from 'react';

import { Alert } from 'ui';

import { usePortal } from 'utils';

import csx from './Alerts.scss';

namespace Alerts {
  export interface Props {
    alerts: Alert.Props[];
  }
}

const Alerts = ({ alerts }: Alerts.Props): JSX.Element => {
  const render = usePortal();

  return render(
    <div className={csx.alerts}>
      {alerts.map((alert) => (
        <Alert key={alert.id} className={csx.alert} {...alert} />
      ))}
    </div>
  );
};

export default Alerts;
