import { useQuery } from '@tanstack/react-query';
import { accountApi } from '../api/account.api';
import { accountKeys } from '../keys/accountKeys';

export const useAccount = (id?: number) => {
  return useQuery({
    queryKey: id ? accountKeys.detail(id) : [],
    queryFn: () => {
      if (!id) {
        throw new Error('Account id is required');
      }

      return accountApi.get(id);
    },
    enabled: !!id,
  });
};
