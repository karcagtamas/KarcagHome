import type { CurrencyDTO, CurrencyTreeDTO } from '../modules/expenses/models/currency';
import { api } from './client';

const CURRENCY_API = '/currencies';

export const currencyApi = {
  getAll: () => api.get<CurrencyDTO[]>(CURRENCY_API).then((res) => res.data),
  get: (id: number) => api.get<CurrencyDTO>(`${CURRENCY_API}/${id}`).then((res) => res.data),
  create: (data: Omit<CurrencyDTO, 'id'>) => api.post<CurrencyDTO>(CURRENCY_API, data).then((res) => res.data),
  update: (id: number, data: Omit<CurrencyDTO, 'id'>) =>
    api.put<CurrencyDTO>(`${CURRENCY_API}/${id}`, data).then((res) => res.data),
  getTree: (year: number, showDisabled: boolean) =>
    api.get<CurrencyTreeDTO[]>(`${CURRENCY_API}/tree`, { params: { year, showDisabled } }).then((res) => res.data),
};
