export const currencyKeys = {
  all: ["currencies"] as const,
  lists: () => [...currencyKeys.all, "list"] as const,
  tree: (year: number, showDisabled: boolean) => [...currencyKeys.all, "tree", year, showDisabled] as const,
  detail: (id: number) => [...currencyKeys.all, id] as const,
};
