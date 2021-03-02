import { useEffect, useState } from 'react';
import { from } from 'rxjs';

interface State<T> {
  data: T | null;
  error: boolean;
  loading: boolean;
}

const STATE: State<unknown> = {
  data: null,
  error: false,
  loading: true,
};

export const useLoad = <T>(source: Promise<T>): [T | null, boolean, boolean] => {
  const [state, setState] = useState(STATE as State<T>);

  const { data, loading, error } = state;

  useEffect(() => {
    if (!loading) {
      setState(STATE as State<T>);
    }

    const sub = from(source).subscribe(
      (data) => {
        setState({ loading: false, error: false, data });
      },
      () => {
        setState({ loading: false, error: true, data: null });
      }
    );

    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, [source]);

  return [data, loading, error];
};
