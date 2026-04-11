export interface ExpenseCategoryDTO {
    id: number;
    name: string;
    color: string;
}

export interface ExpenseDTO {
    id: number;
    amount: number;
    description?: string;
    date: string;
    category: ExpenseCategoryDTO;
}