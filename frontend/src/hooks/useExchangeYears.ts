import { useQuery } from '@tanstack/react-query';
import { currencyKeys } from '../keys/currencyKeys';
import { currencyExchangeApi } from '../api/currency-exchange.api';

export const useExchangeYears = () => {
  return (
    useQuery({
      queryKey: currencyKeys.exchangeYears(),
      queryFn: currencyExchangeApi.getYears,
    }).data ?? []
  );
};
