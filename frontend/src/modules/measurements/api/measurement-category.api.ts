import type { MeasurementCategoryDTO, MeasurementCategoryEditDTO } from '../models/measurement';
import { api } from '../../../api/client';

const MEASUREMENT_CATEGORY_API = '/measurement-categories';

export const measurementCategoryApi = {
  getAll: () => api.get<MeasurementCategoryDTO[]>(MEASUREMENT_CATEGORY_API).then((r) => r.data),
  get: (id: number) => api.get<MeasurementCategoryDTO>(`${MEASUREMENT_CATEGORY_API}/${id}`).then((r) => r.data),
  create: (data: MeasurementCategoryEditDTO) => api.post(MEASUREMENT_CATEGORY_API, data),
  update: (id: number, data: MeasurementCategoryEditDTO) =>
    api.put(`${MEASUREMENT_CATEGORY_API}/${id}`, data).then((r) => r.data),
  delete: (id: number) => api.delete(`${MEASUREMENT_CATEGORY_API}/${id}`),
};
