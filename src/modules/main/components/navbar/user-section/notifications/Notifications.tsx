import React, { useMemo, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { Button, useMenu, Menu, Disclaimer, Loader } from 'ui';

import { UnreadedIcon } from 'shared/components';
import { useNotificationsProvider } from 'shared/providers/notifications';
import { useAuthProvider } from 'shared/providers/auth';

import NotificationsList from './notifications-list';

import csx from './Notifications.scss';

const Notifications = (): JSX.Element => {
  const { location } = useHistory();

  const [anchorEl, menuOpen, openMenu, closeMenu] = useMenu();

  const {
    loading,
    loadingMore,
    notifications,
    markNotificationAsRead,
    loadNotifications,
  } = useNotificationsProvider();

  const unreadedCount = useMemo(() => notifications.filter(({ isRead }) => !isRead).length, [
    notifications,
  ]);

  useEffect(() => {
    closeMenu();
  }, [location.key]);

  useEffect(() => {
    loadNotifications();
  }, []);

  useLayoutEffect(() => {
    const menu = document.querySelector('#notifications .MuiPaper-root');

    if (!menu) {
      return;
    }

    const sub = fromEvent(menu, 'scroll')
      .pipe(
        debounceTime(250),
        map((e) => e.target as HTMLDivElement),
        filter(
          ({ offsetHeight, scrollHeight, scrollTop }) =>
            offsetHeight + scrollTop >= scrollHeight - 350
        )
      )
      .subscribe(loadNotifications);

    return () => {
      sub.unsubscribe();
    };
  }, [menuOpen]);

  return (
    <>
      <Button disabled={loading} variant="icon" theme="primaryTransparent" onClick={openMenu}>
        <NotificationsIcon />
        {unreadedCount > 0 && <UnreadedIcon className={csx.unreadedIcon} />}
      </Button>

      <Menu
        open={menuOpen}
        id="notifications"
        anchorEl={anchorEl}
        keepMounted
        width={372}
        onClose={closeMenu}
      >
        {menuOpen && (
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

            {loadingMore && <Loader className={csx.loader} />}
          </div>
        )}
      </Menu>
    </>
  );
};

export default (): JSX.Element => {
  const { pending } = useAuthProvider();

  return pending ? null : <Notifications />;
};
