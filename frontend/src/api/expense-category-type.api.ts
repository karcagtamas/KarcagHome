import type { ExpenseCategoryTypeDTO } from '../modules/expenses/models/expenses';
import { api } from './client';

const EXPENSE_CATEGORY_TYPE_API = '/expenses/categories/types';

export const expenseCategoryTypeApi = {
  getAll: () => api.get<ExpenseCategoryTypeDTO[]>(EXPENSE_CATEGORY_TYPE_API).then((res) => res.data),
  get: (id: number) => api.get<ExpenseCategoryTypeDTO>(`${EXPENSE_CATEGORY_TYPE_API}/${id}`).then((res) => res.data),
};
