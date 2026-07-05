export const measurementKeys = {
  all: ['measurements'] as const,
  list: (categoryId: number, year: number | null) => [...measurementKeys.all, 'list', categoryId, year] as const,
  years: (categoryId: number) => [...measurementKeys.all, 'years', categoryId] as const,
  categories: () => ['measurement-categories'] as const,
  detail: (id: number) => [...measurementKeys.all, 'detail', id] as const,
};
