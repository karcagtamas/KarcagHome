import { useQuery } from "@tanstack/react-query";
import { currencyKeys } from "../keys/currencyKeys";
import { currencyApi } from "../api/currency.api";

export const useCurrencyTree = (year: number, showDisabled: boolean) => {
  return useQuery({
    queryKey: currencyKeys.tree(year, showDisabled),
    queryFn: () => currencyApi.getTree(year, showDisabled),
  });
};
