import { useQuery } from '@tanstack/react-query';
import { expenseApi } from '../api/expense.api';
import { expenseKeys } from '../keys/expenseKeys';

export const useExpenses = (accountId: number) => {
  return useQuery({
    queryKey: expenseKeys.list(accountId),
    queryFn: () => expenseApi.getAll(accountId),
  });
};
