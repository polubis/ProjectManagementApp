export interface CoreResponse<T = any> {
  data: T;
  errors: string[];
  hasErrors: boolean;
  success: boolean;
}
