export const expenseKeys = {
  all: ['expenses'] as const,
  list: (accountId: number) => [...expenseKeys.all, 'list', accountId] as const,
  tree: (accountId: number) => [...expenseKeys.all, 'tree', accountId] as const,
  categories: () => ['expense-categories'] as const,
  categoryTypes: () => ['expense-category-types'] as const,
};
