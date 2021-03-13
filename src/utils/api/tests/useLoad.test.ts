import { renderHook, act } from '@testing-library/react-hooks';

import { useLoad } from '../useLoad';

describe('useLoad()', () => {
  interface Data {
    id: number;
    name: string;
  }

  const _DATA_: Data = { id: 0, name: 'Name' };

  it('loads and assigns data', async () => {
    const _PROMISE_ = () => Promise.resolve(_DATA_);

    const { result, waitForNextUpdate } = renderHook(() => useLoad(_PROMISE_));

    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(true);
    expect(result.current[2]).toBe(false);

    await waitForNextUpdate();

    expect(result.current[0]).toEqual(_DATA_);
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toBe(false);
  });

  it('resets data when error occurs', async () => {
    const _PROMISE_ = () => Promise.reject();

    const { result, waitForNextUpdate } = renderHook(() => useLoad(_PROMISE_));

    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(true);
    expect(result.current[2]).toBe(false);

    await waitForNextUpdate();

    expect(result.current[0]).toEqual(null);
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toBe(true);
  });

  it('loads data manually', async () => {
    const _PROMISE_ = () => Promise.resolve(_DATA_);

    const { result, waitForNextUpdate } = renderHook(() => useLoad(_PROMISE_));

    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(true);
    expect(result.current[2]).toBe(false);

    await waitForNextUpdate();

    expect(result.current[0]).toEqual(_DATA_);
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toBe(false);

    act(() => {
      result.current[3]();
    });

    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(true);
    expect(result.current[2]).toBe(false);

    await waitForNextUpdate();

    expect(result.current[0]).toEqual(_DATA_);
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toBe(false);
  });
});
