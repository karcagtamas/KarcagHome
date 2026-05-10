export const expenseKeys = {
  all: ['expenses'] as const,
  list: (accountId: number) => [...expenseKeys.all, 'list', accountId] as const,
};
