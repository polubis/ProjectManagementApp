import React, { useMemo, useEffect } from 'react';
import { useHistory } from 'react-router';

import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { Button, useMenu, Menu, Disclaimer } from 'ui';

import { UnreadedIcon } from 'shared/components';
import { useNotificationsProvider } from 'shared/providers/notifications';

import NotificationsList from './notifications-list';

import csx from './Notifications.scss';

const Notifications = (): JSX.Element => {
  const { location } = useHistory();

  const [anchorEl, menuOpen, openMenu, closeMenu] = useMenu();

  const { loading, notifications, markNotificationAsRead } = useNotificationsProvider();

  const unreadedCount = useMemo(() => notifications.filter(({ readed }) => !readed).length, [
    notifications,
  ]);

  useEffect(() => {
    closeMenu();
  }, [location.key]);

  return (
    <>
      <Button disabled={loading} variant="icon" theme="primaryTransparent" onClick={openMenu}>
        <NotificationsIcon />
        {unreadedCount > 0 && <UnreadedIcon className={csx.unreadedIcon} />}
      </Button>

      {menuOpen && (
        <Menu anchorEl={anchorEl} keepMounted={false} width={372} onClose={closeMenu}>
          <div className={csx.notificationsMenu}>
            <h3>Notifications {unreadedCount > 0 ? `(${unreadedCount})` : ''}</h3>

            <Button className={csx.closeBtn} variant="icon" onClick={closeMenu}>
              <CloseIcon />
            </Button>

            {notifications.length > 0 ? (
              <NotificationsList notifications={notifications} onClick={markNotificationAsRead} />
            ) : (
              <Disclaimer
                description={`Don't worry, with time there will be some`}
                title="No notifications"
              />
            )}
          </div>
        </Menu>
      )}
    </>
  );
};

export default Notifications;
