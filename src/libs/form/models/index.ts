/** Determines the shape of the builder object. */
export interface Builder<R> {
  create(): void;
  get(): R;
}
