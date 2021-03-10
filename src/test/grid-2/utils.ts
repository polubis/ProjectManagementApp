export const createPositiveArray = (length: number): number[] =>
  Array.from({ length }, (_, i) => i + 1);

export const toNumericArray = <T>(items: T[]): number[] => items.map((item) => +item);

export const getEdgeItems = <T>(items: T[]): [T, T] => [items[0], items[items.length - 1]];
