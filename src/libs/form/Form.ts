/** Determines the shape of the builder object. */
export interface FormBuilder<R> {
  create(): void;
  get(): R;
}

/** Director in Builder design pattern. */
export default class Form {
  /** Takes an object and calls a sequence of methods. */
  construct<R>({ create, get }: FormBuilder<R>) {
    create();
    return get();
  }
}
