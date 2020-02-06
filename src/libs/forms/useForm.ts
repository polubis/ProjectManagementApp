import { useState, useMemo } from 'react';

import {
  UseFormConfig,
  UseFormField,
  UseFormFields,
  UseForm,
  UseFormChangeEvent,
  UseFormSubmitEvent,
  UseFormFieldConfig
} from '.';

const createFieldState = (
  value: string,
  fieldKey: string,
  fieldConfig: UseFormFieldConfig
) => {
  const { validators = [] } = fieldConfig;
  const errors = validators.map(fn => fn(value, fieldKey));
  const valid = errors.every(({ valid }) => valid);

  return new UseFormField(value, errors, valid);
};

const createInitState = <T extends string>(config: UseFormConfig) =>
  Object.keys(config).reduce(
    (prev, key) => ({ ...prev, [key]: new UseFormField(config[key].value) }),
    {} as UseFormFields<T>
  );

/**
 * Hook created for forms state management purposes
 * @param `config` - needed for initial state creation
 * @returns `[fields, areFieldsInvalid, handleChange, handleSubmit]`
 *
 * `fields` - represents form state
 *
 * `areFieldsInvalid` - flag which informas about current fields validation result
 *
 * `handleChange` - updates value and runs field validation
 *
 * `handleSubmit` - runs validation through all fields and returns `areFieldsInvalid` flag
 */
const useForm = <T extends string>(config: UseFormConfig): UseForm<T> => {
  const [fields, setFields] = useState(createInitState<T>(config));
  const [areFieldsInvalid, setAreFieldsInvalid] = useState(false);
  const [areFieldsDirty, setAreFieldsDirty] = useState(false);
  const fieldsKeys = useMemo(() => Object.keys(fields) as T[], []);

  const handleChange = (event: UseFormChangeEvent) => {
    const { fieldKey } = event.target.dataset;

    if (!fieldKey) {
      throw new Error('Attribute data-field-key is missing');
    }

    const field = createFieldState(
      event.target.value,
      fieldKey,
      config[fieldKey]
    );

    const newFields: UseFormFields<T> = { ...fields, [fieldKey]: field };

    if (areFieldsDirty) {
      setAreFieldsInvalid(fieldsKeys.some(key => !newFields[key].valid));
    }

    setFields(newFields);
  };

  const handleSubmit = (event: UseFormSubmitEvent): boolean => {
    event.preventDefault();

    const newFields = fieldsKeys.reduce(
      (prev, key) => ({
        ...prev,
        [key]: createFieldState(fields[key].value, key, config[key])
      }),
      {} as UseFormFields<T>
    );

    const areFieldsInvalid = fieldsKeys.some(key => !newFields[key].valid);

    setFields(newFields);
    setAreFieldsInvalid(areFieldsInvalid);
    setAreFieldsDirty(true);

    return areFieldsInvalid;
  };

  return [fields, areFieldsInvalid, handleChange, handleSubmit];
};

export default useForm;
