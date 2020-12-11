import React, { useState, useMemo, useCallback } from 'react';
import Form from 'io-form';

import { Modal, Button, Disclaimer, SimpleSelect, FieldBase, SelectControl, SelectBase } from 'ui';

import { User, AccountRole } from 'shared/models';

import { setUserRoles } from '../../services';

import csx from './UserRolesManagement.scss';

namespace UserRolesManagement {
  export interface Props {
    user: User;
    onClose(): void;
    onSuccess(): void;
  }
}

const ROLES = Object.values(AccountRole);

const makeRoles = (value: Record<string, boolean>): SelectBase.Item<AccountRole>[] =>
  ROLES.map(
    (role) =>
      ({
        dataIdx: role,
        label: role,
        value: !!value[role],
      } as SelectBase.Item<AccountRole>)
  );

const UserRolesManagement = ({
  user,
  onClose,
  onSuccess,
}: UserRolesManagement.Props): JSX.Element => {
  const [form, setForm] = useState(
    Form(
      {
        roles: ROLES.reduce(
          (acc, role) => ({
            ...acc,
            ...(user.roles.includes(role) ? { [role]: true } : { [role]: false }),
          }),
          {} as Record<string, boolean>
        ),
      },
      {
        roles: [(v) => !Object.values(v).some((v) => v)],
      }
    )
  );

  const [pending, setPending] = useState(false);

  const { values, errors } = form;

  const roles = useMemo(() => makeRoles(values.roles), [values.roles]);

  const handleRoleSelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      setForm(
        form.next({
          roles: { ...values.roles, [dataIdx]: value },
        })
      );
    },
    [form]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      const checkedForm = form.submit(e);

      if (checkedForm.invalid) {
        setForm(checkedForm);
        return;
      }

      setPending(true);

      try {
        await setUserRoles({
          username: user.username,
          roles: SelectBase.getSelected(values.roles) as AccountRole[],
        });

        onSuccess();
      } catch {
        setPending(false);
      }
    },
    [form, user]
  );

  return (
    <Modal className={csx.userRolesManagement} onClose={pending ? undefined : onClose}>
      <form onSubmit={handleSubmit}>
        <Disclaimer
          description={
            <>
              In this form you can change <b>{user.username}</b> user roles
            </>
          }
          title="Roles management"
        />

        <FieldBase
          className={csx.rolesSelect}
          label="Roles *"
          error={errors.roles ? 'Atleast one role must be selected' : ''}
        >
          <SimpleSelect items={roles} onSelect={handleRoleSelect}>
            <SelectControl
              label={(selected) => selected.join(', ')}
              placeholder="Select roles..."
              value={values.roles}
            />
          </SimpleSelect>
        </FieldBase>

        <footer>
          <Button disabled={pending} theme="primaryTransparent" type="button" onClick={onClose}>
            CANCEL
          </Button>
          <Button disabled={pending || (form.dirty && form.invalid)} type="submit">
            SAVE
          </Button>
        </footer>
      </form>
    </Modal>
  );
};

export default UserRolesManagement;
