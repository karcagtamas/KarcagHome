import { useQuery } from '@tanstack/react-query';
import { expenseKeys } from '../keys/expenseKeys';
import { expenseCategoryTypeApi } from '../api/expense-category-type.api';

export const useExpenseCategoryTypes = () => {
  return useQuery({
    queryKey: expenseKeys.categoryTypes(),
    queryFn: () => expenseCategoryTypeApi.getAll(),
  });
};
