import type { AccountDTO } from './account';

export interface ExpenseCategoryTypeDTO {
  id: number;
  name: string;
  color: string;
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
  description: string | null;
  date: string;
  category: ExpenseCategoryDTO;
  account: AccountDTO;
}

export interface ExpenseTreeCategoryDTO {
  category: ExpenseCategoryDTO;
  expenses: ExpenseDTO[];
}

export interface ExpenseTreeDTO {
  date: string;
  categories: ExpenseTreeCategoryDTO[];
}

export interface ExpenseCategoryEditDTO {
  name: string;
  color: string;
  typeId: number;
}

export interface ExpenseEditDTO {
  amount: number;
  description: string | null;
  date: string;
  categoryId: number;
  accountId: number;
}
