import { useEffect } from 'react';
import { History } from 'history';

import { Url } from 'utils';

import { AccountRole } from 'shared/models';

import { isValidRole } from '../utils';

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
