import { renderHook } from '@testing-library/react-hooks';

import { Form, V } from '..';

describe('useManager()', () => {
  const [_STATE_] = [0];

  const _CONFIG_: Form.Config = [
    { label: 'Username', fns: [V.req, V.min(2), V.max(50)], value: 'Piotr' },
    { label: 'Password', fns: [V.req, V.min(8), V.max(20)] },
  ];

  it('creates initial state', () => {
    const state: Form.State = {
      invalid: false,
      dirty: false,
      fields: [
        {
          value: 'Piotr',
          error: '',
          result: [],
        },
        {
          value: '',
          error: '',
          result: [],
        },
      ],
    };

    const { result } = renderHook(() => Form.useManager(_CONFIG_));

    expect(result.current[_STATE_]).toEqual(state);
  });
});
