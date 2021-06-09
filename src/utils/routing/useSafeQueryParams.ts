import { useLocation } from 'react-router';
import { useMemo } from 'react';

import { isJsonString } from '../parsing';

type Dict = Record<string, unknown>;

type TypeDefKind = 'number' | 'string' | 'boolean' | 'object' | 'array';

type TypeDefs<A extends Dict> = {
  [K in keyof A]: TypeDefKind;
};

type Parser<A> = (value: string, defaultValue: A) => A;

type Parsers = {
  [K in TypeDefKind]: Parser<unknown>;
};

const getTypeKind = <A>(value: A): TypeDefKind => {
  const typeDefKind = typeof value as TypeDefKind;

  if (typeDefKind === 'object') {
    return Array.isArray(value) ? 'array' : 'object';
  }

  return typeDefKind;
};

const stringParser: Parser<string> = (value, defaultValue) => value || defaultValue;
const numberParser: Parser<number> = (value, defaultValue) => {
  if (!value) {
    return defaultValue;
  }

  const numberValue = +value;

  if (Number.isNaN(numberValue)) {
    return defaultValue;
  }

  return numberValue;
};
const booleanParser: Parser<boolean> = (value, defaultValue) => {
  if (value === 'false') {
    return false;
  }

  if (value === 'true') {
    return true;
  }

  return defaultValue;
};
const objectParser: Parser<Record<string, unknown>> = (value, defaultValue) => {
  if (!isJsonString(value)) {
    return defaultValue;
  }

  const parsedValue = JSON.parse(value);

  if (Array.isArray(parsedValue)) {
    return defaultValue;
  }

  return parsedValue;
};
const arrayParser: Parser<unknown[]> = (value, defaultValue) => {
  if (!isJsonString(value)) {
    return defaultValue;
  }

  const parsedValue = JSON.parse(value);

  if (!Array.isArray(parsedValue)) {
    return defaultValue;
  }

  return parsedValue;
};

const PARSERS: Parsers = {
  string: stringParser,
  number: numberParser,
  boolean: booleanParser,
  array: arrayParser,
  object: objectParser,
};

const getTypeDefs = <A extends Dict>(defaults: A): TypeDefs<A> => {
  return Object.keys(defaults).reduce(
    (acc, key): TypeDefs<A> => ({
      ...acc,
      [key]: getTypeKind(defaults[key]),
    }),
    {} as TypeDefs<A>
  );
};

const getSafeQueryParams = <A extends Dict>(
  defaults: A,
  typeDefs: TypeDefs<A>,
  search: string
): A => {
  const urlSearchParams = new URLSearchParams(search);

  return Object.entries(defaults).reduce(
    (acc, [key, value]): A => ({
      ...acc,
      [key]: PARSERS[typeDefs[key]](urlSearchParams.get(key), value),
    }),
    {} as A
  );
};

export const useSafeQueryParams = <A extends Dict>(defaults: A): A => {
  const location = useLocation();

  const typeDefs = useMemo(() => getTypeDefs(defaults), []);
  const safeQueryParams = useMemo(
    () => getSafeQueryParams<A>(defaults, typeDefs, location.search),
    [location]
  );

  return safeQueryParams;
};
