import { Notification, NotificationType } from '..';

// export const getNotifications = () => core.get<Notification[]>(GET_NOTIFICATIONS);

export const getNotifications = () =>
  Promise.resolve([
    {
      id: 0,
      content: 'Added notification',
      type: NotificationType.TEMPLATE_ADDED,
      creationDate: '20 December 2020',
      readed: true,
      author: 'polubik1994'
    },
    {
      id: 1,
      content: 'Added notification',
      type: NotificationType.TEMPLATE_ADDED,
      creationDate: '19 May 2020',
      readed: true,
      author: 'polubik1994'
    },
    {
      id: 2,
      content: 'Added notification',
      type: NotificationType.TEMPLATE_ADDED,
      author: 'polubik1994',
      creationDate: '19 May 2020',
    }
  ] as Notification[]);
