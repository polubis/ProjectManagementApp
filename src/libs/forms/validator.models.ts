export class Validation {
  constructor(public valid: boolean, public text: string) {}
}

export type Validator = (value: string, label: string) => Validation;