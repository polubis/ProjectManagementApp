import { withLazy } from 'shared/utils';

export * from './models';
export * from './config';
export default withLazy(() => import('./Register'));
