import type { CurrencyDTO, CurrencyTreeDTO } from "../modules/expenses/models/currency";
import { api } from "./client";

export const currencyApi = {
  getAll: () => api.get<CurrencyDTO[]>("/currencies").then((res) => res.data),
  get: (id: number) => api.get<CurrencyDTO>(`/currencies/${id}`).then((res) => res.data),
  create: (data: Omit<CurrencyDTO, "id">) => api.post<CurrencyDTO>("/currencies", data).then((res) => res.data),
  update: (id: number, data: Omit<CurrencyDTO, "id">) =>
    api.put<CurrencyDTO>(`/currencies/${id}`, data).then((res) => res.data),
  getTree: (year: number, showDisabled: boolean) =>
    api.get<CurrencyTreeDTO[]>("/currencies/tree", { params: { year, showDisabled } }).then((res) => res.data),
};
