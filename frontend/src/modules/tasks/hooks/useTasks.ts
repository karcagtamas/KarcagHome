import { useQuery } from '@tanstack/react-query';
import { taskKeys } from '../../../keys/taskKeys';
import { taskApi } from '../api/task.api';

export const useTasks = (showAll: boolean, importance: number | null) => {
  return useQuery({
    queryKey: taskKeys.list(showAll, importance),
    queryFn: () => taskApi.getAll(showAll, importance),
  });
};
