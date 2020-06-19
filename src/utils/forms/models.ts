import { ChangeEvent } from 'react';

import { V } from '.';

export namespace Form {
  export namespace Events {
    export interface Change<T = HTMLInputElement | HTMLTextAreaElement> extends ChangeEvent<T> {}

    export interface Submit extends ChangeEvent<HTMLFormElement> {}
  }

  export namespace Field {
    export interface Config {
      label: string;
      fns?: V.Fn[];
      value?: any;
    }

    export interface State {
      value: any;
      error: string;
      result: V.Result[];
    }
  }

  export type Config = Field.Config[];

  export interface State {
    invalid: boolean;
    dirty: boolean;
    fields: Field.State[];
  }

  export type Manager = [
    Form.State,
    (e: Form.Events.Change) => void,
    (positions: number[], values: any[]) => void,
    (e?: Form.Events.Submit) => boolean
  ];
}
