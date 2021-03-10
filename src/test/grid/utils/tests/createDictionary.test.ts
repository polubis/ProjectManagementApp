import { createDictionary, Dictionary } from '../createDictionary';

describe('createDictionary()', () => {
  interface Item {
    id: number;
    name: string;
  }

  it('creates dictionary', () => {
    const _ITEMS_: Item[] = [
      { id: 0, name: 'Name0' },
      { id: 1, name: 'Name1' },
    ];

    expect(createDictionary<Item>(_ITEMS_, 'id')).toEqual({
      0: _ITEMS_[0],
      1: _ITEMS_[1],
    } as Dictionary<Item>);
  });
});
