import React, { useEffect, useState } from "react";

import { useCookiesProvider } from "core/cookies";

import { Button } from "ui";

import csx from './CookiesConsent.scss';

const CookiesConsent = () => {
  const [visible, setVisible] = useState(true);

  const { cookies, setCookie } = useCookiesProvider();

  const consentCookieName = 'cookies-consent';

  const acceptCookies = () => {
    setCookie(consentCookieName, '1');
  };

  useEffect(() => {
    setVisible(!cookies[consentCookieName]);
  }, [cookies[consentCookieName]]);

  return (
    visible
      ? <div className={csx.cookiesConsent}>
        <div>
          <p>
            This website uses cookies to enhance the user experience
          </p>
          <Button onClick={acceptCookies}>Got it!</Button>
        </div>
      </div>
      : null
  )
};

export default CookiesConsent;
