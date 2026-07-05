import type { MeasurementDTO } from '../models/measurement';
import { api } from '../../../api/client';

const MEASUREMENT_API = '/measurements';

export const measurementApi = {
  getAll: (categoryId: number, year: number | null) =>
    api.get<MeasurementDTO[]>(MEASUREMENT_API, { params: { categoryId, year } }).then((r) => r.data),
  get: (id: string) => api.get<MeasurementDTO>(`${MEASUREMENT_API}/${id}`).then((r) => r.data),
  create: (data: Omit<MeasurementDTO, 'id'>) => api.post(MEASUREMENT_API, data),
  update: (id: string, data: MeasurementDTO) => api.put(`${MEASUREMENT_API}/${id}`, data).then((r) => r.data),
  delete: (id: string) => api.delete(`${MEASUREMENT_API}/${id}`),
  getYears: (categoryId: number) =>
    api.get<number[]>(`${MEASUREMENT_API}/years`, { params: { categoryId } }).then((r) => r.data),
};
