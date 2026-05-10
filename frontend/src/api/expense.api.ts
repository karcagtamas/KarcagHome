import type { ExpenseDTO, ExpenseEditDTO } from '../modules/expenses/models/expenses';
import { api } from './client';

const EXPENSE_API = '/expenses';

export const expenseApi = {
  getAll: (accountId: number) => api.get<ExpenseDTO[]>(EXPENSE_API, { params: { accountId } }).then((res) => res.data),
  get: (id: number) => api.get<ExpenseDTO>(`${EXPENSE_API}/${id}`).then((res) => res.data),
  create: (data: ExpenseEditDTO) => api.post<ExpenseDTO>(EXPENSE_API, data).then((res) => res.data),
  upate: (id: number, data: ExpenseEditDTO) =>
    api.put<ExpenseDTO>(`${EXPENSE_API}/${id}`, data).then((res) => res.data),
  delete: (id: number) => api.delete(`${EXPENSE_API}/${id}`),
};
