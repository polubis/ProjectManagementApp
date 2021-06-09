import { useEffect, useState, useCallback } from 'react';
import { from } from 'rxjs';

interface State<T> {
  data: T | null;
  error: boolean;
  loading: boolean;
}

export const useLoad = <T>(source: () => Promise<T>): [T | null, boolean, boolean, () => void] => {
  const [state, setState] = useState<State<T>>({ data: null, error: false, loading: true });

  const handleLoad = useCallback(() => {
    if (!state.loading) {
      setState({ data: null, error: false, loading: true });
    }
  }, [state]);

  useEffect(() => {
    if (state.loading) {
      const sub = from(source()).subscribe(
        (data) => {
          setState({ loading: false, error: false, data });
        },
        () => {
          setState({ loading: false, error: true, data: null });
        }
      );

      return () => {
        sub.unsubscribe();
      };
    }
  }, [state]);

  useEffect(() => {
    handleLoad();
  }, [source]);

  return [state.data, state.loading, state.error, handleLoad];
};
