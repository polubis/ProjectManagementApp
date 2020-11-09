import { ConnectionsController } from './Connections';
import { NotificationsController } from './Notifications';

const Controllers = [
  {
    controller: ConnectionsController,
    path: 'connections',
  },
  {
    controller: NotificationsController,
    path: 'notifications',
  },
];

export default Controllers;
