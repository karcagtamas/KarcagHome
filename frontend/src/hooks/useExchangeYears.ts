import { useQuery } from '@tanstack/react-query';
import { currencyKeys } from '../keys/currencyKeys';
import { currencyApi } from '../api/currency.api';

export const useExchangeYears = () => {
  return (
    useQuery({
      queryKey: currencyKeys.exchangeYears(),
      queryFn: currencyApi.getExchangeYears,
    }).data ?? []
  );
};
