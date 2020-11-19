import React, { memo, useCallback } from 'react';

import { Button } from 'ui';

import { usePortal } from 'utils';

import { useCookiesProvider } from 'core/cookies';

import csx from './CookiesConsent.scss';

const APPROVED = '1';
const NAME = 'cookies-constent';

const CookiesConsent = memo(
  () => {
    const render = usePortal();

    const { cookies, setCookies } = useCookiesProvider();

    const approveConstent = useCallback(() => {
      setCookies(NAME, APPROVED);
    }, []);

    const approved = cookies[NAME] === APPROVED;

    return approved
      ? null
      : render(
          <div className={csx.cookiesConsent}>
            <span>
              This website uses cookies to enhance the user experience.
            </span>
            <Button onClick={approveConstent}>GOT IT!</Button>
          </div>
        );
  },
  () => true
);

export default CookiesConsent;
