import { useQuery } from '@tanstack/react-query';
import { expenseKeys } from '../keys/expenseKeys';
import { expenseCategoryApi } from '../api/expense-category.api';

export const useExpenseCategories = () => {
  return useQuery({
    queryKey: expenseKeys.categories(),
    queryFn: () => expenseCategoryApi.getAll(),
  }).data ?? [];
};
