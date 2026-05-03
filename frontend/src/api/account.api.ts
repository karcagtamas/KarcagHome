import type { AccountDTO, AccountEditDTO } from '../modules/expenses/models/account';
import { api } from './client';

export const accountApi = {
  getAll: () => api.get<AccountDTO[]>('/accounts').then((res) => res.data),
  get: (id: number) => api.get<AccountDTO>(`/accounts/${id}`).then((res) => res.data),
  create: (data: AccountEditDTO) => api.post<AccountDTO>('/accounts', data).then((res) => res.data),
  update: (id: number, data: AccountEditDTO) => api.put<AccountDTO>(`/accounts/${id}`, data).then((res) => res.data),
  delete: (id: number) => api.delete(`/accounts/${id}`),
};
