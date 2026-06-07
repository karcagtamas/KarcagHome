export const taskKeys = {
  all: ['tasks'] as const,
  list: (showAll: boolean, importance: number | null) => [...taskKeys.all, 'list', showAll, importance] as const,
  detail: (id: number) => [...taskKeys.all, 'detail', id] as const,
};
