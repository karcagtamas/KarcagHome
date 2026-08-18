import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseApi } from '../../../api/expense.api';
import { expenseKeys } from '../../../keys/expenseKeys';
import type { ExpenseEditDTO } from '../models/expenses';
import { accountKeys } from '../../../keys/accountKeys';

export const useExpenseMutations = (accountId?: number) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: expenseApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });

      if (accountId) {
        queryClient.invalidateQueries({ queryKey: accountKeys.summary(accountId) });
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ExpenseEditDTO }) => expenseApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });

      if (accountId) {
        queryClient.invalidateQueries({ queryKey: accountKeys.summary(accountId) });
      }
    },
  });

  const removeMutation = useMutation({
    mutationFn: expenseApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });

      if (accountId) {
        queryClient.invalidateQueries({ queryKey: accountKeys.summary(accountId) });
      }
    },
  });

  return {
    createMutation,
    updateMutation,
    removeMutation,
    isPending: createMutation.isPending || updateMutation.isPending || removeMutation.isPending,
  };
};
