import { useQuery } from '@tanstack/react-query';
import { taskKeys } from '../../../keys/taskKeys';
import { taskApi } from '../api/task.api';

export const useCompletedChart = (showAll: boolean, importance: number | null) => {
  return useQuery({
    queryKey: taskKeys.completedChartData(showAll, importance),
    queryFn: () => taskApi.completedChart(showAll, importance),
  });
};
