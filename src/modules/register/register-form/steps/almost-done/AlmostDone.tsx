import React, { useCallback } from 'react';

import { Button, Checkbox } from 'ui';

import { Form } from 'utils';

import { AlmostDoneImage } from '.';

import { COMPANY_REGULATIONS, COMMERCIAL_INFO } from '../../..';

import csx from './AlmostDone.scss';

namespace AlmostDone {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const AlmostDone = ({ formManager, onBack, onSubmit }: AlmostDone.Props) => {
  const [{ dirty, fields, invalid }, _, directChange] = formManager;

  const handleCompanyRegulationsChange = useCallback(
    (_, checked: boolean) => {
      directChange([COMPANY_REGULATIONS], [checked]);
    },
    [directChange],
  );

  const handleCommercialInfoChange = useCallback(
    (_, checked: boolean) => {
      directChange([COMMERCIAL_INFO], [checked]);
    },
    [directChange],
  );

  return (
    <form className={csx.almostDone} onSubmit={onSubmit}>
      <AlmostDoneImage />

      <span className={csx.description}>
        After confirming the regulations and acceptance we will send you an activation link to your
        email address
      </span>

      <div className={csx.divider} />

      <Checkbox
        invalid={!!fields[COMPANY_REGULATIONS].error}
        variant="informing"
        label={`* I declare that I have read the content of these 
        regulations. I accept its content and undertake to 
        comply with it.`}
        value={fields[COMPANY_REGULATIONS].value}
        onChange={handleCompanyRegulationsChange}
      />

      <Checkbox
        variant="informing"
        label={`I agree to receive commercial information by electronic 
        means`}
        value={fields[COMMERCIAL_INFO].value}
        onChange={handleCommercialInfoChange}
      />

      <footer>
        <Button theme="primaryTransparent" onClick={onBack}>
          BACK
        </Button>

        <Button type="submit" disabled={dirty && invalid}>
          CREATE ACCOUNT
        </Button>
      </footer>
    </form>
  );
};

export default AlmostDone;
