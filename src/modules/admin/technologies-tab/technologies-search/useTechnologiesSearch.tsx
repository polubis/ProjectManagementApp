import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { useScroll, Url } from 'utils';

import { TemplatesPayload, TemplatesSearchFilters } from 'core/api';

import { useTechnologiesProvider } from 'core/technologies/TechnologiesProvider';

export const useTechnologiesSearch = () => {
  const { replace, location } = useHistory();

  const { getTechnologies } = useTechnologiesProvider();

  useEffect(() => {
    getTechnologies(location.search);
  }, [location.key]);
};
