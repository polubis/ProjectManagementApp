import { useMemo } from 'react';

import { LIMIT } from '..';

export const useSpaceholdersCount = (pendingRequests: number): number => {
  const spaceholdersCount = useMemo(() => pendingRequests * LIMIT, [pendingRequests]);

  return spaceholdersCount;
};
