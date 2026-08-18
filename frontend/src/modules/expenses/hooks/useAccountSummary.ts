import { useQuery } from '@tanstack/react-query';
import { accountKeys } from '../../../keys/accountKeys';
import { accountApi } from '../../../api/account.api';

export const useAccountSummary = (id?: number) => {
  return useQuery({
    queryKey: id ? accountKeys.summary(id) : [],
    queryFn: () => {
      if (!id) {
        throw new Error('Account id is required');
      }

      return accountApi.getSummary(id);
    },
    enabled: !!id,
  });
};
