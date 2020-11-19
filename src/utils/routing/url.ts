import { isRefType } from '..';

export const Url = ({ pathname, search }: { pathname: string; search: string }) => ({
  concat: (value: string) => Url({ pathname: `${pathname}${value}`, search }),
  delete: (key: string) => {
    const searchObj = new URLSearchParams(search);

    searchObj.delete(key);

    return Url({ pathname, search: searchObj.toString() });
  },

  swap: (key: string, value: any) => {
    const searchObj = new URLSearchParams(search);

    searchObj.delete(key);
    searchObj.set(key, isRefType(value) ? JSON.stringify(value) : `${value}`);

    return Url({ pathname, search: searchObj.toString() });
  },

  replace: (toReplace: string, value: any) => Url({ pathname: pathname.replace(toReplace, value), search }),

  value: () => `${pathname}${search.includes('?') ? search : `?${search}`}`,

  search: () => search,

  pathname: () => pathname,
});
