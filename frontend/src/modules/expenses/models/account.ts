import type { CurrencyDTO } from './currency';
import type { ExpenseCategoryDTO, ExpenseCategoryTypeDTO } from './expenses';

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

export interface AccountSummaryDTO {
  total: number;
  categories: {
    category: ExpenseCategoryDTO;
    amount: number;
  }[];
  categoryTypes: {
    categoryType: ExpenseCategoryTypeDTO[];
    amount: number;
  }[];
}
