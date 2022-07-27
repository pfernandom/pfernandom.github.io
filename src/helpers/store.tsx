export type Dict = Record<string, Array<string>>;

interface DataFetcher {
  termVariations: Dict;
  getTermsWithVariations: (terms: Array<string>) => Array<string>;
}

class DataFetcherImpl implements DataFetcher {
  termVariations: Dict;

  getTermsWithVariations(terms) {
    return terms.reduce((acc, el) => {
      return [...acc, el, ...(this.termVariations[el] ?? [])];
    }, []);
  }
}

const store = new DataFetcherImpl();

export function withStore(): DataFetcher {
  return store;
}
