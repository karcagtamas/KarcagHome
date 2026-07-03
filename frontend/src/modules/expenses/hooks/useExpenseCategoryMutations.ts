import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseCategoryApi } from '../../../api/expense-category.api';
import { expenseKeys } from '../../../keys/expenseKeys';
import type { ExpenseCategoryEditDTO } from '../models/expenses';

export const useExpenseCategoryMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: expenseCategoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.categories() });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ExpenseCategoryEditDTO }) => expenseCategoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.categories() });
    },
  });

  const removeMutation = useMutation({
    mutationFn: expenseCategoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.categories() });
    },
  });

  return {
    createMutation,
    updateMutation,
    removeMutation,
    isPending: createMutation.isPending || updateMutation.isPending || removeMutation.isPending,
  };
};
