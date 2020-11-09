import { useQuery } from '.';

export const useQueryParams = (...keys: string[]) => {
  const query = useQuery();

  const params = keys.map((k) => query.get(k) || '');

  return params;
};
