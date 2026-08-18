import type { CurrencyDTO } from './currency';

export interface AccountDTO {
  id: number;
  name: string;
  currency: CurrencyDTO;
  baseValue: number;
}

export interface AccountEditDTO {
  name: string;
  currencyId: number;
  baseValue: number;
}
