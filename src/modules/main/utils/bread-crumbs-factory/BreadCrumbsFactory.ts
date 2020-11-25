namespace BreadCrumbsFactory {
  export interface Item {
    label: string;
    path: string;
  }
}

const isGuid = (url: string) => url.includes('-');

class BreadCrumbsFactory {
  static create = (url: string): BreadCrumbsFactory.Item[] => {
    const urls = url.replace('/app/', '').split('/');

    return urls
      .map((part) => (isGuid(part) ? 'details' : part))
      .map(
        (part, i) =>
          ({
            label: part,
            path: `/app/${urls.slice(0, i + 1).join('/')}`,
          } as BreadCrumbsFactory.Item)
      );
  };
}

export default BreadCrumbsFactory;
