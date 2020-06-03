import React from 'react';

import { Button, Checkbox } from 'shared/ui';

import { AlmostDoneProps, AlmostDoneImage } from '.';

import csx from './AlmostDone.scss';

export const AlmostDone = ({
  formManager: [{ isDirty, fields, isInvalid }, change],
  onBack,
  onSubmit
}: AlmostDoneProps) => {
  return (
    <form className={csx.almostDone} onSubmit={onSubmit}>
      <AlmostDoneImage />

      <span className={csx.description}>
        After confirming the regulations and acceptance we will send you an activation link to your
        email address
      </span>

      <div className={csx.divider} />

      <Checkbox
        variant="informing"
        label={`* I declare that I have read the content of these 
        regulations. I accept its content and undertake to 
        comply with it.`}
        value={fields[0].value}
        onChange={() => {}}
      />

      <Checkbox
        variant="informing"
        label={`* I agree to receive commercial information by electronic 
        means`}
        value={fields[1].value}
        onChange={() => {}}
      />

      <footer>
        <Button type="button" theme="primaryTransparent" onClick={onBack}>
          BACK
        </Button>

        <Button type="submit" disabled={isDirty && isInvalid}>
          CREATE ACCOUNT
        </Button>
      </footer>
    </form>
  );
};
