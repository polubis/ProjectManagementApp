export interface ApiResponse<R> {
  data: R;
  errors: string[];
  hasErrors: boolean;
  success: boolean;
}