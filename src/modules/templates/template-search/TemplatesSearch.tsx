import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Checkbox, Select } from 'ui';

import { Form, useQueryParams } from 'utils';

import { useTechnologiesProvider } from 'core/technologies';

import csx from './TemplatesSearch.scss';

const TemplatesSearch = () => {
  const history = useHistory();

  const [query] = useQueryParams('query');

  const { technologies } = useTechnologiesProvider();

  const [{ fields }, change, directChange, submit] = Form.useManager([
    { label: 'Query', value: query },
    { label: 'Technologies', value: [] }
  ]);

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

  const handleSubmit = useCallback(
    (e: Form.Events.Submit) => {
      const isInvalid = submit(e);

      if (isInvalid) {
        return;
      }

      const [{ value: query }] = fields;

      history.push(`/app/templates/all?query=${query}`);
    },
    [fields]
  );

  useEffect(() => {
    directChange([0], [query]);
  }, [query]);

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

export default TemplatesSearch;
