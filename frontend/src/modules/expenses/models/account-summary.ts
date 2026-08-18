import type { ExpenseCategoryDTO, ExpenseCategoryTypeDTO } from "./expenses";

export interface AccountSummaryDTO {
  total: number;
  categories: {
    category: ExpenseCategoryDTO;
    amount: number;
  }[];
  categoryTypes: {
    categoryType: ExpenseCategoryTypeDTO;
    amount: number;
  }[];
  expenses: {
    date: string;
    amount: number;
  }[]
}
