import { useQuery } from "@tanstack/react-query";
import { currencyApi } from "../api/currency.api";
import { currencyKeys } from "../keys/currencyKeys";

export const useCurrencies = () => {
  return (
    useQuery({
      queryKey: currencyKeys.lists(),
      queryFn: currencyApi.getAll,
    }).data ?? []
  );
};
