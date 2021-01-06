import { renderHook, act } from '@testing-library/react-hooks';

import { Errors, State } from '../models';
import { useForm } from '../useForm';

import { VALUES, VALIDATORS } from './utils';
import { Values } from './models';

describe('useForm()', () => {
  it('inits', () => {
    const { result } = renderHook(() => useForm(VALUES));
    const { state, change, submit } = result.current;

    expect(state).toEqual({
      values: VALUES,
      invalid: false,
      touched: false,
      errors: {
        username: false,
        email: false,
        password: false,
        repeatedPassword: false,
        phone: false,
        policyConfirmation: false,
        age: false,
        items: false,
      },
      dirty: false,
    } as State<Values, boolean>);
    expect(change).toBeTruthy();
    expect(submit).toBeTruthy();
  });

  it('validates on init', () => {
    const { result } = renderHook(() =>
      useForm({ ...VALUES, repeatedPassword: '', age: 15 }, VALIDATORS)
    );

    expect(result.current.state.invalid).toBe(true);
    expect(result.current.state.errors).toEqual({
      username: false,
      email: false,
      password: true,
      repeatedPassword: true,
      phone: false,
      policyConfirmation: true,
      age: true,
      items: false,
    } as Errors<Values, boolean>);
  });

  it('updates values', () => {
    const { result } = renderHook(() => useForm(VALUES));

    act(() => {
      result.current.change({ repeatedPassword: '' });
    });

    expect(result.current.state.values).toEqual({ ...VALUES, repeatedPassword: '' });

    act(() => {
      result.current.change({ age: 12 });
    });

    expect(result.current.state.values).toEqual({ ...VALUES, repeatedPassword: '', age: 12 });
  });

  it('validates on update', () => {
    const { result } = renderHook(() =>
      useForm({ ...VALUES, repeatedPassword: '', age: 15 }, VALIDATORS)
    );

    expect(result.current.state.invalid).toBe(true);
    expect(result.current.state.errors).toEqual({
      username: false,
      email: false,
      password: true,
      repeatedPassword: true,
      phone: false,
      policyConfirmation: true,
      age: true,
      items: false,
    } as Errors<Values, boolean>);

    act(() => {
      result.current.change({ repeatedPassword: 'piotr1994', age: 16 });
    });

    expect(result.current.state.invalid).toBe(true);
    expect(result.current.state.errors).toEqual({
      username: false,
      email: false,
      password: false,
      repeatedPassword: false,
      phone: false,
      policyConfirmation: true,
      age: false,
      items: false,
    } as Errors<Values, boolean>);

    act(() => {
      result.current.change({ policyConfirmation: true });
    });

    expect(result.current.state.invalid).toBe(false);
    expect(result.current.state.errors).toEqual({
      username: false,
      email: false,
      password: false,
      repeatedPassword: false,
      phone: false,
      policyConfirmation: false,
      age: false,
      items: false,
    } as Errors<Values, boolean>);
  });

  it('marks as touched', () => {
    const { result } = renderHook(() => useForm(VALUES));

    expect(result.current.state.touched).toBe(false);

    act(() => {
      result.current.change({ repeatedPassword: '' });
    });

    expect(result.current.state.touched).toBe(true);

    act(() => {
      result.current.change({ repeatedPassword: 'password' });
    });

    expect(result.current.state.touched).toBe(true);
  });

  it('marks as dirty', () => {
    const { result } = renderHook(() => useForm(VALUES));

    expect(result.current.state.dirty).toBe(false);

    act(() => {
      result.current.submit({ preventDefault: () => {} });
    });

    expect(result.current.state.dirty).toBe(true);
  });

  it('prevents default', () => {
    const preventDefaultSpy = jest.fn().mockImplementation(() => {});
    const { result } = renderHook(() => useForm(VALUES));

    act(() => {
      result.current.submit({ preventDefault: preventDefaultSpy });
    });

    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
