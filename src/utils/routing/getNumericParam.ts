export const getNumericParam = (value: string, defaultValue: number): number => {
  if (value === undefined || value === '') {
    return defaultValue;
  }

  const parsedValue = +value;

  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }

  return parsedValue;
};
