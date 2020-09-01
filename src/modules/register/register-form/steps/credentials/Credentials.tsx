import React, { useCallback } from 'react';

import { Button, InputField, FileField } from 'ui';

import { Form } from 'utils';

import { USERNAME, EMAIL, PASSWORD, REPEATED_PASSWORD } from '../../..';

namespace Credentials {
  export interface Props {
    formManager: Form.Manager;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const Credentials = ({ formManager, onSubmit }: Credentials.Props) => {
  const [{ dirty, fields, invalid }, change, directChange] = formManager;

  const handlePasswordChange = useCallback(
    (e: Form.Events.Change) => {
      directChange(
        [PASSWORD, REPEATED_PASSWORD],
        [e.target.value, fields[REPEATED_PASSWORD].value]
      );
    },
    [fields]
  );

  const handleRepeatedPasswordChange = useCallback(
    (e: Form.Events.Change) => {
      directChange([PASSWORD, REPEATED_PASSWORD], [fields[PASSWORD].value, e.target.value]);
    },
    [fields]
  );

  return (
    <form onSubmit={onSubmit}>
      {console.log(fields[USERNAME].value)}
      <FileField
        data-idx={0}
        label="Picture"
        value={fields[USERNAME].value ? fields[USERNAME].value[0] : null}
        error="Invalid something"
        formats="PNG, JPEG, XML"
        onChange={change}
      />

      <InputField
        data-idx={USERNAME}
        label="Username *"
        placeholder="Type your username..."
        error={dirty ? fields[USERNAME].error : ''}
        value={fields[USERNAME].value}
        onChange={change}
      />

      <InputField
        data-idx={EMAIL}
        label="Email *"
        placeholder="Type email adress..."
        error={dirty ? fields[EMAIL].error : ''}
        value={fields[EMAIL].value}
        onChange={change}
      />

      <InputField
        data-idx={PASSWORD}
        label="Password *"
        placeholder="Type password..."
        type="password"
        error={dirty ? fields[PASSWORD].error : ''}
        value={fields[PASSWORD].value}
        onChange={handlePasswordChange}
      />

      <InputField
        data-idx={REPEATED_PASSWORD}
        label="Repeated password *"
        placeholder="Repeat your password..."
        type="password"
        error={dirty ? fields[REPEATED_PASSWORD].error : ''}
        value={fields[REPEATED_PASSWORD].value}
        onChange={handleRepeatedPasswordChange}
      />

      <Button type="submit" disabled={dirty && invalid}>
        NEXT
      </Button>
    </form>
  );
};

export default Credentials;
