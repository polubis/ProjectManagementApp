export const toNumericArray = <T>(items: T[]): number[] => {
  const convertedItems = items.map((item) => +item);

  convertedItems.forEach((item) => {
    if (Number.isNaN(item)) {
      throw new Error('Invalid item in items parameter. Converted value is NaN');
    }
  });

  return convertedItems;
};
