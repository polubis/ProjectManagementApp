export class CustomState<T> {
  private error: string;
  private pending: boolean;
  private data: T;
  private readonly preparedData: T;

  constructor(preparedData: T) {
    this.preparedData = preparedData;
  }

  public init(): CustomState<T> {
    const copy: CustomState<T> = new CustomState<T>(this.preparedData);
    copy.pending = true;
    copy.data = this.preparedData;
    copy.error = '';
    return copy;
  }

  public ok(data: T): CustomState<T> {
    const copy: CustomState<T> = new CustomState<T>(this.preparedData);
    copy.pending = false;
    copy.data = data;
    copy.error = '';
    return copy;
  }

  public fail(message: string): CustomState<T> {
    const copy: CustomState<T> = new CustomState<T>(this.preparedData);
    copy.pending = false;
    copy.error = message;
    copy.data = this.preparedData;
    return copy;
  }
}
