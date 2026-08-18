import { useQuery } from '@tanstack/react-query';
import { expenseApi } from '../../../api/expense.api';
import { expenseKeys } from '../../../keys/expenseKeys';

export const useExpenseTree = (accountId: number) => {
  return useQuery({
    queryKey: expenseKeys.tree(accountId),
    queryFn: () => expenseApi.tree(accountId),
  });
};
