import { core } from '../core/api';
import { ErrorBoundary } from 'shared/error-boundary';

export const postError = (payload: ErrorBoundary.Error) => core.post('/error', payload);
