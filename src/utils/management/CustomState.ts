export function State<T>(data: T): CustomState<T> {
  return new CustomState(data);
}

class CustomState<T> {
  error: string;
  pending: boolean;
  preparedData: T;

  constructor(public data: T) {}

  init(): CustomState<T> {
    return { ...this, pending: true, data: this.preparedData, error: '' };
  }

  ok(data: T): CustomState<T> {
    return { ...this, pending: false, data: data, error: '' };
  }

  fail(message: string): CustomState<T> {
    return { ...this, pending: false, data: this.preparedData, error: message };
  }
}
