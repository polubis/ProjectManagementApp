import React, { useEffect } from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';

import { useSafeQueryParams } from '../useSafeQueryParams';

describe('useSafeQueryParams()', () => {
  interface Props<A extends Record<string, unknown>> {
    defaults: A;
    onMount(data: A): void;
  }

  const Component = <A extends Record<string, unknown>>({ defaults, onMount }: Props<A>): null => {
    const safeQueryParams = useSafeQueryParams<A>(defaults);

    useEffect(() => {
      onMount(safeQueryParams);
    }, []);

    return null;
  };

  interface RunTestConfig<A> {
    entries: string[];
    defaults: A;
    result: A;
  }

  const testUseSafeQueryParams = <A extends Record<string, unknown>>({
    entries,
    defaults,
    result,
  }: RunTestConfig<A>): void => {
    const spy = jest.fn();

    render(
      <MemoryRouter initialEntries={entries}>
        <Component defaults={defaults} onMount={spy} />
      </MemoryRouter>
    );

    expect(spy).toHaveBeenCalledWith(result);
  };

  const DEFAULTS = {
    limit: 25,
    page: 1,
    query: '',
    open: false,
  };

  it('returns defaults when no data in search query', () => {
    testUseSafeQueryParams({
      entries: ['/'],
      defaults: DEFAULTS,
      result: { limit: 25, page: 1, query: '', open: false },
    });
  });

  it('merges defaults with data from search query', () => {
    testUseSafeQueryParams({
      entries: ['/?limit=20'],
      defaults: DEFAULTS,
      result: { limit: 20, page: 1, query: '', open: false },
    });
  });

  it('returns defaults when data is in invalid type', () => {
    testUseSafeQueryParams({
      entries: ['/?limit=20&page=3sd&open=truee'],
      defaults: DEFAULTS,
      result: { limit: 20, page: 1, query: '', open: false },
    });
  });

  describe('for', () => {
    describe('array', () => {
      it('if no data in url returns default value', () => {
        testUseSafeQueryParams({
          entries: ['/'],
          defaults: { technologiesIds: [] },
          result: { technologiesIds: [] },
        });
      });

      it('if data exists in url returns parsed data ', () => {
        testUseSafeQueryParams({
          entries: ['/admin?technologiesIds=%5B"2"%2C"3"%5D'],
          defaults: { technologiesIds: [] },
          result: { technologiesIds: ['2', '3'] },
        });
      });
    });

    describe('object', () => {
      it('if no data in url returns default value', () => {
        testUseSafeQueryParams({
          entries: ['/'],
          defaults: { user: null },
          result: { user: null },
        });
      });

      it('if data exists in url returns parsed data ', () => {
        testUseSafeQueryParams({
          entries: ['/admin?user=%7B%22id%22%3A1%2C%22username%22%3A%22piotr%22%7D'],
          defaults: { user: null },
          result: { user: { id: 1, username: 'piotr' } },
        });
      });
    });
  });
});
