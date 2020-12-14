import React from 'react';
import { User } from 'shared/models';
import { getUsers } from '../services';
import { Subject, Subscription, Observable, from, throwError } from 'rxjs';
import { tap, switchMap, catchError, distinctUntilChanged } from 'rxjs/operators';

interface State<D> {
  data: D[];
  error: string;
  loading: boolean;
  loadingMore: boolean;
  pendingLoadings: number;
}

interface Config<D, P> {
  method(filters: P): Promise<D[]>;
  loadOn: (keyof P)[];
  loadMoreOn: (keyof P)[];
}

type Props<P> = {
  filters: P;
};

const WithUrlFiltersManager = <D extends unknown, P extends Record<keyof P, P[keyof P]>>(
  config: Config<D, P>
) => (
  Component: React.ComponentType<Props<P> & State<D>>
): React.ComponentClass<Props<P>, State<D>> => {
  const STATE: State<D> = {
    data: [],
    error: '',
    loading: true,
    loadingMore: false,
    pendingLoadings: 1,
  };

  class UrlFiltersManager extends React.Component<Props<P>, State<D>> {
    private _load = new Subject<P>();
    private _load$ = this._load.asObservable();

    private _subs = new Subscription();

    private _handleLoad = (): Subscription => {
      return this._load$
        .pipe(
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
          tap(() => {
            this.setState({ ...STATE });
          }),
          switchMap((filters) =>
            from(config.method(filters)).pipe(
              tap((data) => {
                this.setState({
                  ...STATE,
                  data,
                  loading: false,
                  pendingLoadings: 0,
                });
              }),
              catchError((error) => {
                this.setState({
                  ...STATE,
                  error,
                  loading: false,
                  pendingLoadings: 0,
                });

                return throwError(error);
              })
            )
          )
        )
        .subscribe();
    };

    componentDidMount(): void {
      this._subs.add(this._handleLoad());

      this._load.next(this.props.filters);
    }

    componentDidUpdate(prevProps): void {
      if (prevProps.filters !== this.props.filters) {
        this._load.next(this.props.filters);
      }
    }

    componentWillUnmount(): void {
      this._subs.unsubscribe();
    }

    readonly state: State<D> = { ...STATE };

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  }

  return UrlFiltersManager;
};

export default WithUrlFiltersManager;

// const C = WithUrlFiltersManager<User, { role: string; query: string; limit: string; page: string }>(
//   {
//     method: getUsers,
//     loadOn: ['role', 'query', 'limit'],
//     loadMoreOn: ['page'],
//   }
// )(() => {
//   return <React.Fragment>siema</React.Fragment>;
// });

// class WithPageFilters extends React.Component {
//     render() {
//         return (

//         )
//     }
// }

// const Component = (props) => {
//     const data = usePageFilters();

//     // data.loading ?
// }

// export default WithPageFilters({
//     {
//         method: Promise,
//         loadOn: ['role', 'query', 'limit'],
//         loadMoreOn: ['page']
//     }
// })(Component);
