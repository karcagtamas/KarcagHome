export const currencyKeys = {
  all: ['currencies'] as const,
  list: (showDisabled: boolean) => [...currencyKeys.all, 'list', showDisabled] as const,
  tree: (year: number, showDisabled: boolean) => [...currencyKeys.all, 'tree', year, showDisabled] as const,
  detail: (id: number) => [...currencyKeys.all, id] as const,
  exchangeYears: () => ['exchange-years'] as const,
  availableMonths: (currencyFromId: number, currencyToId: number, year: number) =>
    ['avalable-months', currencyFromId, currencyToId, year] as const,
};
