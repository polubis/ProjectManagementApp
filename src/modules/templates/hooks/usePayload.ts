import { useMemo } from 'react';

import { TemplatesPayload } from 'core/api';

import { TemplatesSearchFilters } from '..';

export const usePayload = (filters: TemplatesSearchFilters): TemplatesPayload => {
  const payload: TemplatesPayload = useMemo(
    () => ({
      ...filters,
      page: +filters.page,
      limit: +filters.limit,
      technologiesIds: JSON.parse(filters.technologiesIds),
      patternsIds: JSON.parse(filters.patternsIds)
    }),
    [filters]
  );

  return payload;
};
