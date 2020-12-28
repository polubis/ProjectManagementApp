import React, { useState, useMemo, useCallback, memo } from 'react';
import Form from 'io-form';

import {
  Modal,
  Button,
  FieldBase,
  SimpleSelect,
  SelectControl,
  TextareaField,
  Disclaimer,
  SelectBase,
} from 'ui';

import { addSurvey } from 'shared/services';
import { useAlertsProvider } from 'shared/providers/alerts';

import AddSurveyImage from './AddSurveyImage';

import csx from './AddSurvey.scss';
import { useCookiesProvider } from 'shared/providers/cookies';
import { useAuthProvider } from 'shared/providers/auth';

namespace AddSurvey {
  export interface Props {
    onClose(): void;
  }
}

const makeRatings = (value: Record<number, boolean>): SelectBase.Item[] =>
  [1, 2, 3, 4, 5].map(
    (rate) =>
      ({
        dataIdx: rate,
        label: rate,
        value: !!value[rate],
      } as SelectBase.Item)
  );

const AddSurvey = ({ onClose }: AddSurvey.Props): JSX.Element => {
  const { showAlert } = useAlertsProvider();

  const [{ errors, dirty, invalid, next, submit, values }, setForm] = useState(
    Form(
      {
        opinion: '',
        rate: {} as Record<number, boolean>,
      },
      {
        opinion: [(v) => (v ? v.length < 10 || v.length > 1000 : false)],
        rate: [(v) => !Object.values(v).some((v) => v)],
      }
    )
  );

  const [pending, setPending] = useState(false);

  const handleOpinionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setForm(next({ opinion: e.target.value }));
    },
    [values]
  );

  const handleRateSelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      setForm(
        next({
          rate: { [dataIdx]: value },
        })
      );
    },
    [values]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      const checkedForm = submit(e);

      if (checkedForm.invalid) {
        setForm(checkedForm);
        return;
      }

      setPending(true);

      try {
        await addSurvey({
          feedback: values.opinion,
          rating: +SelectBase.getSelected(values.rate)[0],
        });

        showAlert({ message: 'Thank you :). Your survey has been added', type: 'success' });
        onClose();
      } catch (message) {
        setPending(false);
        showAlert({ message });
      }
    },
    [values]
  );

  const rates = useMemo(() => makeRatings(values.rate), [values.rate]);

  return (
    <Modal className={csx.addSurvey} onClose={pending ? undefined : onClose}>
      <form onSubmit={handleSubmit}>
        <figure>
          <AddSurveyImage />
        </figure>

        <Disclaimer
          description="Your feedback will help us improve our application. Please add honest rate"
          title="We need your feedback!"
        />

        <FieldBase
          className={csx.rate}
          label="Rate *"
          error={dirty && errors.rate ? 'Atleast one rate must be selected' : ''}
        >
          <SimpleSelect items={rates} onSelect={handleRateSelect}>
            <SelectControl
              label={(selected) => `${selected} rate selected`}
              placeholder="Select rate from 1 to 5..."
              value={values.rate}
            />
          </SimpleSelect>
        </FieldBase>

        <TextareaField
          className={csx.opinion}
          label="Opinion"
          error={dirty && errors.opinion ? 'Invalid opinion length' : ''}
          value={values.opinion}
          onChange={handleOpinionChange}
          placeholder="Add some honest opinion..."
        />

        <footer>
          <Button disabled={pending} theme="primaryTransparent" type="button" onClick={onClose}>
            MAYBE LATER
          </Button>
          <Button disabled={pending || (dirty && invalid)} type="submit">
            SUBMIT
          </Button>
        </footer>
      </form>
    </Modal>
  );
};

const [NAME, SURVEY_ADD_DISPLAYED] = ['survey-add-displayed', '1'];

export default memo(
  (): JSX.Element => {
    const { cookies, setCookies } = useCookiesProvider();

    const { authorized, user } = useAuthProvider();

    const handleClose = useCallback(() => {
      setCookies(NAME, SURVEY_ADD_DISPLAYED);
    }, []);

    const open = authorized && user.connectedWithGithub && !cookies[NAME];

    return open ? <AddSurvey onClose={handleClose} /> : null;
  },
  () => true
);
