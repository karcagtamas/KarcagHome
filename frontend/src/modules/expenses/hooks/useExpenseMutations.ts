import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseApi } from '../../../api/expense.api';
import { expenseKeys } from '../../../keys/expenseKeys';
import type { ExpenseEditDTO } from '../models/expenses';

export const useExpenseMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: expenseApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ExpenseEditDTO }) => expenseApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });

  const removeMutation = useMutation({
    mutationFn: expenseApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });

  return {
    createMutation,
    updateMutation,
    removeMutation,
    isPending: createMutation.isPending || updateMutation.isPending || removeMutation.isPending,
  };
};
