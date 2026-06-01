export const accountKeys = {
  all: ['accounts'] as const,
  list: () => [...accountKeys.all, 'list'] as const,
  detail: (id: number) => [...accountKeys.all, 'detail', id] as const,
};
