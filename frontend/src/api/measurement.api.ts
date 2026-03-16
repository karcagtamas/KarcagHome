import type { Measurement } from "../models/measurement";
import { api } from "./client";

export const MeasurementApi = {
    list: () => api.get<Measurement[]>('/measurements')
        .then(r => r.data),
    get: (id: string) => api.get<Measurement>(`/measurements/${id}`)
        .then(r => r.data),
    create: (data: Omit<Measurement, 'id'>) => api.post('/measurements', data),
    update: (id: string, data: Measurement) => api.put(`/measurements/${id}`, data),
    delete: (id: string) => api.delete(`/measurements/${id}`),
};