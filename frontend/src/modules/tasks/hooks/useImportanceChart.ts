import { useQuery } from '@tanstack/react-query';
import { taskKeys } from '../../../keys/taskKeys';
import { taskApi } from '../api/task.api';

export const useImportanceChart = (showAll: boolean, importance: number | null) => {
  return useQuery({
    queryKey: taskKeys.importanceChartData(showAll, importance),
    queryFn: () => taskApi.importanceChart(showAll, importance),
  });
};
