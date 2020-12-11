export const createQuery = <T extends Record<keyof T, T[keyof T]>>(payload: T): string => {
  const query = Object.entries(payload).reduce(
    (acc, [key, value]) => acc + `${key}=${value}&`,
    '?'
  );

  return query.slice(0, query.length - 1);
};
