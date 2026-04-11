import type { CurrencyDTO } from "../models/currency";
import { api } from "./client";

export const currencyApi = {
  getAll: () => api.get<CurrencyDTO[]>("/currencies").then((res) => res.data),
  get: (id: number) => api.get<CurrencyDTO>(`/currencies/${id}`).then((res) => res.data),
  create: (data: Omit<CurrencyDTO, "id">) => api.post<CurrencyDTO>("/currencies", data).then((res) => res.data),
  updated: (id: number, data: CurrencyDTO) => api.put<CurrencyDTO>(`/currencies/${id}`, data).then((res) => res.data),
};
