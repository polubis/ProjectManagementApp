export interface Stateable<T> {
  error: string;
  pending: boolean;
  data: T;
  init(): Stateable<T>;
  ok(data: T): Stateable<T>;
  fail(error: string): Stateable<T>;
}

class StateManager<T> implements Stateable<T> {
  error: string;
  pending: boolean;
  data: T;

  constructor(private _data: T) {
    this.data = this._data;
    this.error = '';
    this.pending = true;
  }

  init = (): Stateable<T> => {
    this.data = this._data;
    this.error = '';
    this.pending = true;

    return { ...this };
  };

  ok = (data: T): Stateable<T> => {
    this.data = data;
    this.pending = false;
    this.error = '';

    return { ...this };
  };

  fail = (error: string): Stateable<T> => {
    this.error = error;
    this.pending = false;
    this.data = this._data;

    return { ...this };
  };
}

export const State = <T>(data: T = null): Stateable<T> => new StateManager<T>(data);
