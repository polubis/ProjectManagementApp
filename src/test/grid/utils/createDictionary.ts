export type Dictionary<T> = Record<string | number, T>;

export const createDictionary = <T extends Record<string, any>>(
  items: T[],
  key: keyof T
): Dictionary<T> => {
  const dictionary = items.reduce(
    (acc, item): Dictionary<T> => ({
      ...acc,
      [item[key] as string]: item,
    }),
    {} as Dictionary<T>
  );

  return dictionary;
};
