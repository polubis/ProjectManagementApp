import React, { useCallback, useContext, useEffect } from 'react';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Checkbox, Select } from 'ui';

import { throttle, Form } from 'utils';

import { TechnologiesContext } from 'core/technologies';

import { TemplatesSearchProps, searchFormConfig } from '.';

import csx from './TemplatesSearch.scss';

export const TemplatesSearch = ({ onSubmit }: TemplatesSearchProps) => {
  const { technologies } = useContext(TechnologiesContext);

  const [{ fields }, change, directChange, submit] = Form.useManager(searchFormConfig);

  const setTechnologiesSelection = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
      const id = +e.currentTarget.getAttribute('data-id');
      const mappedTechnologies: Checkbox.Props[] = fields[1].value.map((item: Checkbox.Props) =>
        id === item.dataId
          ? {
              ...item,
              value
            }
          : item
      );

      directChange([1], [mappedTechnologies]);
    },
    [fields]
  );

  const throttledOnSubmit = useCallback(throttle(onSubmit, 500), []);

  const handleSubmit = useCallback(
    (e: Form.Events.Submit) => {
      const isInvalid = submit(e);

      if (isInvalid) {
        return;
      }

      throttledOnSubmit({
        query: fields[0].value
      });
    },
    [fields]
  );

  useEffect(() => {
    const mappedTechnologies: Checkbox.Props[] = technologies.map(({ id, name }) => ({
      dataId: id,
      label: name,
      value: false
    }));

    directChange([1], [mappedTechnologies]);
  }, [technologies]);

  return (
    <form className={csx.templatesSearch} onSubmit={handleSubmit}>
      <input
        data-idx={0}
        placeholder="Find your template..."
        className={csx.input}
        value={fields[0].value}
        onChange={change}
      />

      <Select
        label="Technologies *"
        placeholder="All technologies"
        className={csx.select}
        openClass={csx.selectMenuOpen}
        items={fields[1].value}
        onSelect={setTechnologiesSelection}
      />

      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};
