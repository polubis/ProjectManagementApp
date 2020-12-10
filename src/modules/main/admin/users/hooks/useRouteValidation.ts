import { useEffect } from 'react';
import { History } from 'history';

import { Url } from 'utils';

import { AccountRole } from 'shared/models';

const isValidRole = (role: AccountRole): boolean => Object.values(AccountRole).includes(role);

export const useRouteValidation = (role: AccountRole, { replace }: History): void => {
  useEffect(() => {
    if (!role) {
      const url = Url(location).concat(`/${AccountRole.Admin}`).value();

      replace(url);
    } else if (!isValidRole(role)) {
      const url = Url(location).replace(role, AccountRole.Admin).value();

      replace(url);
    }
  }, [role]);
};
