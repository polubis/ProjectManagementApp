export const getEdgeItems = <T>(items: T[]): [T, T] => {
  if (!items.length) {
    throw new Error('Invalid items parameter. Array must have atleast one item');
  }

  return [items[0], items[items.length - 1]];
};
