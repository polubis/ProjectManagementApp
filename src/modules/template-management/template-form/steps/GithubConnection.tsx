import React, { useCallback } from 'react';

import { Button, Checkbox, InputField } from 'ui';

import { Form } from 'utils';

import csx from './GithubConnection.scss';

namespace GithubConnection {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const [REPO_LINK, PUBLIC_ACCESS, PRIVATE_ACCESS] = [0, 1, 2];

const GithubConnection = ({ formManager, onSubmit, onBack }: GithubConnection.Props) => {
  const [{ fields, dirty, invalid }, change, directChange] = formManager;

  const handlePublishAccessChange = useCallback(
    (_, checked: boolean) => {
      directChange([PUBLIC_ACCESS, PRIVATE_ACCESS], [checked, !checked]);
    },
    [directChange]
  );

  const handlePrivateAccessChange = useCallback(
    (_, checked: boolean) => {
      directChange([PUBLIC_ACCESS, PRIVATE_ACCESS], [!checked, checked]);
    },
    [directChange]
  );

  return (
    <form onSubmit={onSubmit}>
      <InputField
        data-idx={REPO_LINK}
        label="Repository link *"
        placeholder="Add repository link..."
        error={dirty ? fields[REPO_LINK].error : ''}
        value={fields[REPO_LINK].value}
        onChange={change}
      />

      <div className={csx.access}>
        <Checkbox
          variant="informing"
          label="Make the template public - all users will see it"
          value={fields[PUBLIC_ACCESS].value}
          onChange={handlePublishAccessChange}
        />

        <Checkbox
          variant="informing"
          label="Make the template private - only you will be able 
to view this template"
          value={fields[PRIVATE_ACCESS].value}
          onChange={handlePrivateAccessChange}
        />
      </div>

      <footer>
        <Button type="button" theme="primaryTransparent" onClick={onBack}>
          BACK
        </Button>
        <Button type="submit" disabled={dirty && invalid}>
          NEXT
        </Button>
      </footer>
    </form>
  );
};

export default GithubConnection;
