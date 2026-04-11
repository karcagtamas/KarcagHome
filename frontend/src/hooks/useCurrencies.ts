import { useQuery } from "@tanstack/react-query";
import { currencyApi } from "../api/currency.api";

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: currencyApi.getAll,
  });
};
