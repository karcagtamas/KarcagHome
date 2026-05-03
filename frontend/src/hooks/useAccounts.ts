import { useQuery } from '@tanstack/react-query';
import { accountApi } from '../api/account.api';
import { accountKeys } from '../keys/accountKeys';

export const useAccounts = () => {
  return useQuery({
    queryKey: accountKeys.lists(),
    queryFn: accountApi.getAll,
  });
};
