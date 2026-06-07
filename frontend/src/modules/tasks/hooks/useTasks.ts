import { useQuery } from '@tanstack/react-query';
import { taskKeys } from '../../../keys/taskKeys';
import { taskApi } from '../api/task.api';

export const useTasks = () => {
  return useQuery({
    queryKey: taskKeys.list(),
    queryFn: taskApi.getAll,
  });
};
