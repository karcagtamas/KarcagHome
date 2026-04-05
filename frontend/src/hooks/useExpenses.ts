import { useQuery } from "@tanstack/react-query"
import { expensesApi } from "../api/expenses.api"

export const useExpenses = () => {
    return useQuery({
        queryKey: ["expenses"],
        queryFn: expensesApi.getAll,
    });
}