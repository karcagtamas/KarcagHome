import type { ExpenseCategoryDTO, ExpenseCategoryEditDTO } from '../modules/expenses/models/expenses';
import { api } from './client';

const EXPENSE_CATEGORY_API = '/expenses/categories';

export const expenseApi = {
  getAll: () => api.get<ExpenseCategoryDTO[]>(EXPENSE_CATEGORY_API).then((res) => res.data),
  get: (id: number) => api.get<ExpenseCategoryDTO>(`${EXPENSE_CATEGORY_API}/${id}`).then((res) => res.data),
  create: (data: ExpenseCategoryEditDTO) =>
    api.post<ExpenseCategoryDTO>(EXPENSE_CATEGORY_API, data).then((res) => res.data),
  upate: (id: number, data: ExpenseCategoryEditDTO) =>
    api.put<ExpenseCategoryDTO>(`${EXPENSE_CATEGORY_API}/${id}`, data).then((res) => res.data),
  delete: (id: number) => api.delete(`${EXPENSE_CATEGORY_API}/${id}`),
};
