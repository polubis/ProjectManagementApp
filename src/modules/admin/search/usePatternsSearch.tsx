import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { usePatternsProvider } from 'core/patterns/PatternsProvider';;

export const usePatternsSearch = () => {
  const { location } = useHistory();

  console.log({ location })

  const { getPatterns } = usePatternsProvider();

  useEffect(() => {
    getPatterns(location.search);
  }, [location.key]);
};