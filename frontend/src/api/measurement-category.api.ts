import type { MeasurementCategory } from "../modules/measurements/models/measurement";
import { api } from "./client";

export const MeasurementCategoryApi = {
    list: () => api.get<MeasurementCategory[]>('/measurement-categories')
        .then(r => r.data),
    get: (id: string) => api.get<MeasurementCategory>(`/measurement-categories/${id}`)
        .then(r => r.data),
    create: (data: Omit<MeasurementCategory, 'id'>) => api.post('/measurement-categories', data),
    update: (id: string, data: MeasurementCategory) => api.put(`/measurement-categories/${id}`, data),
    delete: (id: string) => api.delete(`/measurement-categories/${id}`),
};