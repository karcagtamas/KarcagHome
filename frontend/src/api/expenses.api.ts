import type { ExpenseDTO } from "../modules/expenses/models/expenses";
import { api } from "./client";

export const expensesApi = {
    getAll: () => api.get<ExpenseDTO[]>("/expenses")
        .then(r => r.data),
}