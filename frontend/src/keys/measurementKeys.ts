export const measurementKeys = {
  all: ['measurements'] as const,
  list: () => [...measurementKeys.all, 'list'] as const,
  detail: (id: number) => [...measurementKeys.all, 'detail', id] as const,
};
