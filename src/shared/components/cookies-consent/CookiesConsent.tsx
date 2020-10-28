import React, { useEffect, useState } from "react";

import { Button } from "ui";

import { useCookiesProvider } from "core/cookies";

import csx from './CookiesConsent.scss';

const COOKIE_NAME = 'cookies-consent';

const COOKIES_ALLOWED = '1';

const CookiesConsent = () => {
  const [visible, setVisible] = useState(true);

  const { cookies, setCookie } = useCookiesProvider();

  const handleAccept = () => {
    setCookie(COOKIE_NAME, COOKIES_ALLOWED);
  };

  useEffect(() => {
    setVisible(!cookies[COOKIE_NAME]);
  }, [cookies[COOKIE_NAME]]);

  return (
    visible
      ? <div className={csx.cookiesConsent}>
          <p>
            This website uses cookies to enhance the user experience
          </p>
          <Button onClick={handleAccept}>Got it!</Button>
      </div>
      : null
  )
};

export default CookiesConsent;
