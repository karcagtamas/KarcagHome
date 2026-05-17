import type { AccountDTO } from './account';

export interface ExpenseCategoryTypeDTO {
  id: number;
  name: string;
}

export interface ExpenseCategoryDTO {
  id: number;
  name: string;
  color: string;
  type: ExpenseCategoryTypeDTO;
}

export interface ExpenseDTO {
  id: number;
  amount: number;
  description?: string;
  date: Date;
  category: ExpenseCategoryDTO;
  account: AccountDTO;
}

export interface ExpenseCategoryEditDTO {
  name: string;
  color: string;
  typeId: number;
}

export interface ExpenseEditDTO {
  amount: number;
  description?: string;
  date: Date;
  categoryId: number;
  accountId: number;
}
