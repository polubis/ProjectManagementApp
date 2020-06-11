import React, { useState, useCallback, useContext, useEffect } from 'react';

import { Button } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import { CheckboxProps, Select } from 'shared/ui';

import { TechnologiesContext } from 'providers/technologies';

import csx from './TemplatesSearch.scss';

export const TemplatesSearch = () => {
  const { technologies } = useContext(TechnologiesContext);

  const [searchData, setSearchData] = useState({
    technologies: [],
    phrase: ''
  });

  const setTechnologiesSelection = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
      const id = +e.currentTarget.getAttribute('data-id');
      const mappedTechnologies: CheckboxProps[] = searchData.technologies.map(
        (item: CheckboxProps) =>
          id === item.dataId
            ? {
                ...item,
                value
              }
            : item
      );

      setSearchData({
        phrase: '',
        technologies: mappedTechnologies
      });
    },
    [searchData]
  );

  useEffect(() => {
    const mappedTechnologies: CheckboxProps[] = technologies.map(({ id, name }) => ({
      dataId: id,
      label: name,
      value: false
    }));

    setSearchData({
      phrase: '',
      technologies: mappedTechnologies
    });
  }, [technologies]);

  return (
    <form className={csx.templatesSearch}>
      <input placeholder="Find your template..." className={csx.input} />

      <Select
        label="Technologies *"
        placeholder="All technologies"
        className={csx.select}
        openClass={csx.selectMenuOpen}
        items={searchData.technologies}
        onSelect={setTechnologiesSelection}
      />

      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};
