import { getEdgeItems } from '../getEdgeItems';

describe('getEdgeItems()', () => {
  it('throws an error for empty array', () => {
    expect(() => getEdgeItems([])).toThrow();
  });

  it('gets edge items', () => {
    expect(getEdgeItems([1])).toEqual([1, 1]);
    expect(getEdgeItems([1, 1])).toEqual([1, 1]);
    expect(getEdgeItems([1, 2, 3])).toEqual([1, 3]);
  });
});
