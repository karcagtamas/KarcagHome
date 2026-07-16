import { useMutation, useQueryClient } from '@tanstack/react-query';
import { currencyApi } from '../../../api/currency.api';
import type { CurrencyDTO } from '../models/currency';
import { currencyKeys } from '../../../keys/currencyKeys';
import { currencyExchangeApi } from '../../../api/currency-exchange.api';

export const useCurrencyMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: currencyApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<CurrencyDTO, 'id'> }) => currencyApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.all });
    },
  });

  const exchangeSaveMutation = useMutation({
    mutationFn: currencyExchangeApi.save,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.all });
      queryClient.invalidateQueries({ queryKey: currencyKeys.exchangeYears() });
    },
  });

  const exchangeRemoveMutation = useMutation({
    mutationFn: ({
      currencyFromId,
      currencyToId,
      year,
      month,
    }: {
      currencyFromId: number;
      currencyToId: number;
      year: number;
      month: number;
    }) => currencyExchangeApi.delete(currencyFromId, currencyToId, year, month),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.all });
      queryClient.invalidateQueries({ queryKey: currencyKeys.exchangeYears() });
    },
  });

  return {
    createMutation,
    updateMutation,
    exchangeSaveMutation,
    exchangeRemoveMutation,
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      exchangeSaveMutation.isPending ||
      exchangeRemoveMutation.isPending,
  };
};
