import { useQuery } from "@tanstack/react-query";
import { currencyKeys } from "../keys/currencyKeys";
import { currencyApi } from "../api/currency.api";

export const useCurrencyTree = (year: number) => {
  return useQuery({
    queryKey: currencyKeys.tree(year),
    queryFn: () => currencyApi.getTree(year),
  });
};
