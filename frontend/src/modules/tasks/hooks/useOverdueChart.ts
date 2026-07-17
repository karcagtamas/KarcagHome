import { useQuery } from '@tanstack/react-query';
import { taskKeys } from '../../../keys/taskKeys';
import { taskApi } from '../api/task.api';

export const useOverdueChart = (showAll: boolean, importance: number | null) => {
  return useQuery({
    queryKey: taskKeys.overdueChartData(showAll, importance),
    queryFn: () => taskApi.overdueChart(showAll, importance),
  });
};
