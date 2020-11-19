import React, { useMemo } from 'react';

import NotificationsIcon from '@material-ui/icons/Notifications';

import { Button, useMenu, Menu } from 'ui';

import { Palette } from 'styles';

import { Notification } from 'core/api';

import { useNotificationsProvider } from 'shared/providers/notifications';

import NotificationsList from './notifications-list';

import UnreadedIcon from './unreaded-icon';

import csx from './Notifications.scss';

const getUnreadedCount = (notifications: Notification[]) => () =>
  notifications.filter(({ readed }) => !readed).length;

const Notifications = () => {
  const [anchorEl, menuOpen, openMenu, closeMenu] = useMenu();

  const { loading, notifications } = useNotificationsProvider();

  const unreadedCount = useMemo(getUnreadedCount(notifications), [
    notifications,
  ]);

  return (
    <>
      <Button
        disabled={loading}
        variant="icon"
        theme="primaryTransparent"
        onClick={openMenu}
      >
        <NotificationsIcon />
        {unreadedCount > 0 && <UnreadedIcon className={csx.unreadedIcon} />}
      </Button>

      {menuOpen && (
        <Menu
          anchorEl={anchorEl}
          background={Palette.surfaceSecondary}
          keepMounted={false}
          width={540}
          onClose={closeMenu}
        >
          <h5 className={csx.header}>
            Notifications {unreadedCount > 0 ? `(${unreadedCount})` : ''}
          </h5>

          <NotificationsList items={notifications} />
        </Menu>
      )}
    </>
  );
};

export default Notifications;
