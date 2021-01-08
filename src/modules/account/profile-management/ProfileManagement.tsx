import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import Form from 'io-form';

import { Button, InputField, SimpleSelect, FieldBase, SelectBase, SelectControl } from 'ui';

import { TechnologiesSelect } from 'shared/components';
import { EXPERIENCE_ITEMS, SENIORITY_ITEMS } from 'shared/consts';
import { UpdateUserDataPayload } from 'shared/models';
import { useAlertsProvider } from 'shared/providers/alerts';
import { updateUserData } from 'shared/services';
import { useAuthProvider } from 'shared/providers/auth';
import { useTechnologiesProvider } from 'shared/providers/technologies';

import csx from './ProfileManagement.scss';

const makeExperienceItems = (value: { [key: string]: boolean }) => () =>
  EXPERIENCE_ITEMS.map(
    (item, idx) =>
      ({
        dataIdx: `${idx}`,
        label: item,
        value: !!value[idx],
      } as SelectBase.Item)
  );

const makeSeniorityItems = (value: { [key: string]: boolean }) => () =>
  SENIORITY_ITEMS.map(
    (item, idx) =>
      ({
        dataIdx: `${idx}`,
        label: item,
        value: !!value[idx],
      } as SelectBase.Item)
  );

const ProfileManagement = (): JSX.Element => {
  const history = useHistory();

  const { showAlert } = useAlertsProvider();

  const { technologies } = useTechnologiesProvider();

  const { user, updateUser } = useAuthProvider();

  const [pending, setPending] = useState(false);

  const [{ values, dirty, invalid, next, errors, submit }, setForm] = useState(
    Form(
      {
        position: user.position || '',
        seniority:
          user.seniority !== null ? { [user.seniority]: true } : ({} as Record<string, boolean>),
        company: user.company || '',
        yearsOfExperience:
          user.yearsOfExperience !== null
            ? { [user.yearsOfExperience]: true }
            : ({} as Record<string, boolean>),
        technologiesIds:
          user.technologies.length > 0
            ? user.technologies.reduce(
                (acc, { id }) => ({
                  ...acc,
                  ...{ [id]: true },
                }),
                {} as Record<string, boolean>
              )
            : ({} as Record<string, boolean>),
      },
      {
        position: [(v) => (v.trim() ? v.length < 2 || v.length > 100 : false)],
        company: [(v) => (v.trim() ? v.length < 2 || v.length > 100 : false)],
      }
    )
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const key = e.currentTarget.getAttribute('data-key') as keyof UpdateUserDataPayload;

      setForm(
        next({
          [key]: e.target.value,
        })
      );
    },
    [values]
  );

  const handleSenioritySelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      setForm(
        next({
          seniority: { [dataIdx]: value },
        })
      );
    },
    [values]
  );

  const handleTechnologySelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      setForm(
        next({
          technologiesIds: { ...values.technologiesIds, [dataIdx]: value },
        })
      );
    },
    [values]
  );

  const handleExperienceSelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      setForm(
        next({
          yearsOfExperience: { [dataIdx]: value },
        })
      );
    },
    [values]
  );

  const mappedExperienceItems = useMemo(makeExperienceItems(values.yearsOfExperience), [values]);

  const mappedSeniorityItems = useMemo(makeSeniorityItems(values.seniority), [values]);

  const handleBack = useCallback(() => {
    history.replace('/account/profile');
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      const checkedForm = submit(e);

      setForm(checkedForm);

      if (checkedForm.invalid) {
        return;
      }

      setPending(true);

      try {
        const choosenSeniorityKey = SelectBase.getSelected(values.seniority)[0];
        const seniority = choosenSeniorityKey !== undefined ? +choosenSeniorityKey : undefined;
        const technologiesIds = SelectBase.getSelected(values.technologiesIds).map((k) => +k);
        const choosenYearsOfExperienceKey = SelectBase.getSelected(values.yearsOfExperience)[0];
        const yearsOfExperience =
          choosenYearsOfExperienceKey !== undefined ? +choosenYearsOfExperienceKey : undefined;

        await updateUserData({
          ...values,
          seniority,
          technologiesIds,
          yearsOfExperience,
        });

        updateUser({
          ...values,
          seniority,
          yearsOfExperience,
          technologies: technologies.filter((t) => technologiesIds.includes(t.id)),
        });

        showAlert({ message: 'Your user profile has been successfully updated', type: 'success' });

        history.replace('/account/profile');
      } catch (message) {
        setPending(false);
        showAlert({ message });
      }
    },
    [user, values, technologies]
  );

  return (
    <div className={csx.profileManagement}>
      <h3>Profile management</h3>

      <form onSubmit={handleSubmit}>
        <div className={csx.fields}>
          <InputField
            data-key="position"
            label="Position"
            placeholder="Type your position..."
            error={dirty ? (errors.position ? 'Invalid position format' : '') : ''}
            value={values.position}
            onChange={handleChange}
          />

          <FieldBase label="Seniority">
            <SimpleSelect items={mappedSeniorityItems} onSelect={handleSenioritySelect}>
              <SelectControl
                label={(selected) => mappedSeniorityItems[+selected[0]].label}
                placeholder="Select seniority..."
                value={values.seniority}
              />
            </SimpleSelect>
          </FieldBase>
        </div>

        <div className={csx.fields}>
          <InputField
            data-key="company"
            label="Company"
            placeholder="Type company..."
            error={dirty ? (errors.company ? 'Invalid company format' : '') : ''}
            value={values.company}
            onChange={handleChange}
          />

          <FieldBase label="Years of experience">
            <SimpleSelect items={mappedExperienceItems} onSelect={handleExperienceSelect}>
              <SelectControl
                label={(selected) => mappedExperienceItems[+selected[0]].label}
                placeholder="Select years..."
                value={values.yearsOfExperience}
              />
            </SimpleSelect>
          </FieldBase>
        </div>

        <FieldBase label="Technologies">
          <TechnologiesSelect value={values.technologiesIds} onSelect={handleTechnologySelect}>
            <SelectControl
              label={({ length }) => `${length} technolog${length > 1 ? 'ies' : 'y'} selected`}
              placeholder="Select technologies..."
              value={values.technologiesIds}
            />
          </TechnologiesSelect>
        </FieldBase>

        <footer>
          <Button disabled={pending} type="button" theme="primaryTransparent" onClick={handleBack}>
            BACK
          </Button>

          <Button type="submit" disabled={pending || (dirty && invalid)}>
            UPDATE PROFILE
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default ProfileManagement;
