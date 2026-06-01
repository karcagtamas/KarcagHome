import type { AccountDTO, AccountEditDTO } from '../modules/expenses/models/account';
import { api } from './client';

const ACCOUNT_API = "/accounts";

export const accountApi = {
  getAll: () => api.get<AccountDTO[]>(ACCOUNT_API).then((res) => res.data),
  get: (id: number) => api.get<AccountDTO>(`${ACCOUNT_API}/${id}`).then((res) => res.data),
  create: (data: AccountEditDTO) => api.post<AccountDTO>(ACCOUNT_API, data).then((res) => res.data),
  update: (id: number, data: AccountEditDTO) => api.put<AccountDTO>(`${ACCOUNT_API}/${id}`, data).then((res) => res.data),
  delete: (id: number) => api.delete(`${ACCOUNT_API}/${id}`),
};
