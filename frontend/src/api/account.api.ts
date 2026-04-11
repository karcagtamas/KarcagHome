import type { AccountDTO } from "../modules/expenses/models/account";
import { api } from "./client";

export const accountApi = {
    getAll: () => api.get<AccountDTO[]>("/accounts").then((res) => res.data),
    get: (id: number) => api.get<AccountDTO>(`/accounts/${id}`).then((res) => res.data),
    create: (data: Omit<AccountDTO, 'id'>) => api.post<AccountDTO>("/accounts", data).then((res) => res.data),
    updated: (id: number, data: AccountDTO) => api.put<AccountDTO>(`/accounts/${id}`, data).then((res) => res.data),
    delete: (id: number) => api.delete(`/accounts/${id}`),
}