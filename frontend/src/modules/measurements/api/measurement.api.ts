import type { Measurement } from '../models/measurement';
import { api } from '../../../api/client';

const MEASUREMENT_API = '/measurements';

export const MeasurementApi = {
  list: () => api.get<Measurement[]>(MEASUREMENT_API).then((r) => r.data),
  get: (id: string) => api.get<Measurement>(`${MEASUREMENT_API}/${id}`).then((r) => r.data),
  create: (data: Omit<Measurement, 'id'>) => api.post(MEASUREMENT_API, data),
  update: (id: string, data: Measurement) => api.put(`${MEASUREMENT_API}/${id}`, data),
  delete: (id: string) => api.delete(`${MEASUREMENT_API}/${id}`),
};
