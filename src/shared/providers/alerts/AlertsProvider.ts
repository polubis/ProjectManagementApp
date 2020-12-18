import { Alert } from 'ui';

import { makeAlertsManagement, AlertsManagementState } from 'utils';

const { AlertsContext, AlertsProvider, useAlertsProvider } = makeAlertsManagement<Alert.Props>();

namespace AlertsProvider {
  export type State = AlertsManagementState<Alert.Props>;
}

export { AlertsContext, useAlertsProvider };

export default AlertsProvider;
