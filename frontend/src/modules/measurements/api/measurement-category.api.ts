import type { MeasurementCategory } from '../models/measurement';
import { api } from '../../../api/client';

const MEASUREMENT_CATEGORY_API = '/measurement-categories';

export const MeasurementCategoryApi = {
  list: () => api.get<MeasurementCategory[]>(MEASUREMENT_CATEGORY_API).then((r) => r.data),
  get: (id: string) => api.get<MeasurementCategory>(`${MEASUREMENT_CATEGORY_API}/${id}`).then((r) => r.data),
  create: (data: Omit<MeasurementCategory, 'id'>) => api.post(MEASUREMENT_CATEGORY_API, data),
  update: (id: string, data: MeasurementCategory) => api.put(`${MEASUREMENT_CATEGORY_API}/${id}`, data),
  delete: (id: string) => api.delete(`${MEASUREMENT_CATEGORY_API}/${id}`),
};
