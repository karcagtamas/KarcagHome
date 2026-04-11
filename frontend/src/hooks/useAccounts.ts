import { useQuery } from "@tanstack/react-query";
import { accountApi } from "../api/account.api";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: accountApi.getAll,
  });
};
