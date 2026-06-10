export const taskKeys = {
  all: ['tasks'] as const,
  list: (showAll: boolean, importance: number | null) => [...taskKeys.all, 'list', showAll, importance] as const,
  completedChartData: (showAll: boolean, importance: number | null) =>
    [...taskKeys.all, 'completedChart', showAll, importance] as const,
  importanceChartData: (showAll: boolean, importance: number | null) =>
    [...taskKeys.all, 'importanceChart', showAll, importance] as const,
  detail: (id: number) => [...taskKeys.all, 'detail', id] as const,
};
