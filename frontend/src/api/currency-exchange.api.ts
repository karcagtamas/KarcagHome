import type { CurrencyExchangeDTO } from '../modules/expenses/models/currency';
import { api } from './client';

const CURRENCY_EXCHANGE_API = '/currencies/exchanges';

export const currencyExchangeApi = {
  getYears: () => api.get<number[]>(`${CURRENCY_EXCHANGE_API}/years`).then((res) => res.data),
  save: (data: CurrencyExchangeDTO) =>
    api.post<CurrencyExchangeDTO>(CURRENCY_EXCHANGE_API, data).then((res) => res.data),
  delete: (currencyFromId: number, currencyToId: number, year: number, month: number) =>
    api.delete(CURRENCY_EXCHANGE_API, { params: { currencyFromId, currencyToId, year, month } }),
};
