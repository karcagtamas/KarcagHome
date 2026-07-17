import { useQuery } from "@tanstack/react-query";
import { currencyApi } from "../../../api/currency.api";
import { currencyKeys } from "../../../keys/currencyKeys";

export const useCurrencies = (showDisabled: boolean = false) => {
  return (
    useQuery({
      queryKey: currencyKeys.list(showDisabled),
      queryFn: () => currencyApi.getAll(showDisabled),
    }).data ?? []
  );
};
