import { useEffect } from 'react';
import { History } from 'history';

import { Url } from 'utils';

import { DictionaryKind } from '..';

const isValidCategory = (kind: DictionaryKind) =>
  Object.values(DictionaryKind).includes(kind);

export const useRouteValidation = (
  kind: DictionaryKind,
  { replace }: History
) => {
  useEffect(() => {
    if (!kind) {
      const url = Url(location).concat(`/${DictionaryKind.PATTERNS}`).value();

      replace(url);
    } else if (!isValidCategory(kind)) {
      const url = Url(location).replace(kind, DictionaryKind.PATTERNS).value();

      replace(url);
    }
  }, [kind]);
};
