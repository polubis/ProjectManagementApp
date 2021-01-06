class CustomState<T> {
  error: string;
  pending: boolean;
  data: T;

  constructor(private _data: T) {}
  init = (): CustomState<T> => ({ ...this, pending: true, data: this._data, error: '' });
  ok = (data: T): CustomState<T> => ({ ...this, pending: false, data, error: '' });
  fail = (message: string): CustomState<T> => ({
    ...this,
    pending: false,
    data: this._data,
    error: message,
  });
}

export const State = <T>(data: T): CustomState<T> => new CustomState<T>(data);
