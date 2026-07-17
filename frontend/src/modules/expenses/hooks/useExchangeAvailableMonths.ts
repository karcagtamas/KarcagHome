import { useQuery } from '@tanstack/react-query';
import { currencyKeys } from '../../../keys/currencyKeys';
import { currencyExchangeApi } from '../../../api/currency-exchange.api';

export const useExchangeAvailableMonths = (currencyFromId: number, currencyToId: number, year: number) => {
  const isReady = Boolean(currencyFromId) && Boolean(currencyToId);

  return (
    useQuery({
      queryKey: currencyKeys.availableMonths(currencyFromId, currencyToId, year),
      queryFn: () => currencyExchangeApi.getAvailableMonths(currencyFromId, currencyToId, year),
      enabled: isReady,
    }).data ?? []
  );
};
