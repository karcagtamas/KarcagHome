export const currencyKeys = {
  all: ["currencies"] as const,
  lists: () => [...currencyKeys.all, "list"] as const,
  tree: (year: number) => [...currencyKeys.all, "tree", year] as const,
  detail: (id: number) => [...currencyKeys.all, id] as const,
};
