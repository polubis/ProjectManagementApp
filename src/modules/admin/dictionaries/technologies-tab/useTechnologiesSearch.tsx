import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { useTechnologiesProvider } from 'core/technologies/TechnologiesProvider';

export const useTechnologiesSearch = () => {
  const { location } = useHistory();

  const { getTechnologies } = useTechnologiesProvider();

  useEffect(() => {
    getTechnologies(location.search);
  }, [location.key]);
};
