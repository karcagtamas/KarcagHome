import { api } from '../../../api/client';
import type { TaskCompletedChartDTO, TaskDTO, TaskEditDTO, TaskImportanceChartDTO, TaskOverdueChartDTO } from '../models/task';

const TASK_API = '/tasks';

export const taskApi = {
  getAll: (showAll: boolean, importance: number | null) =>
    api
      .get<TaskDTO[]>(TASK_API, {
        params: {
          showAll,
          importance,
        },
      })
      .then((res) => res.data),
  get: (id: number) => api.get<TaskDTO>(`${TASK_API}/${id}`).then((res) => res.data),
  create: (data: TaskEditDTO) => api.post<TaskDTO>(TASK_API, data).then((res) => res.data),
  update: (id: number, data: TaskEditDTO) => api.put<TaskDTO>(`${TASK_API}/${id}`, data).then((res) => res.data),
  delete: (id: number) => api.delete(`${TASK_API}/${id}`),
  toggle: (id: number) => api.patch<TaskDTO>(`${TASK_API}/${id}/toggle`).then((res) => res.data),
  completedChart: (showAll: boolean, importance: number | null) =>
    api
      .get<TaskCompletedChartDTO[]>(`${TASK_API}/charts/completed`, { params: { showAll, importance } })
      .then((res) => res.data),
  overdueChart: (showAll: boolean, importance: number | null) =>
    api
      .get<TaskOverdueChartDTO[]>(`${TASK_API}/charts/overdue`, { params: { showAll, importance } })
      .then((res) => res.data),
  importanceChart: (showAll: boolean, importance: number | null) =>
    api
      .get<TaskImportanceChartDTO[]>(`${TASK_API}/charts/importance`, { params: { showAll, importance } })
      .then((res) => res.data),
};
