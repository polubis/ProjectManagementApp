export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
  phone: string;
  policyConfirmation: boolean;
  age: number;
  items: {
    id: number;
    name: string;
  }[];
}
