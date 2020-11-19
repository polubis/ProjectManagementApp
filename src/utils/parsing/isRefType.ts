export const isRefType = (value: any) =>
  Array.isArray(value) || typeof value === 'object';
