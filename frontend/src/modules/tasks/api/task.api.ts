import { api } from '../../../api/client';
import type { TaskDTO, TaskEditDTO } from '../models/task';

const TASK_API = '/tasks';

export const taskApi = {
  getAll: () => api.get<TaskDTO[]>(TASK_API).then((res) => res.data),
  get: (id: number) => api.get<TaskDTO>(`${TASK_API}/${id}`).then((res) => res.data),
  create: (data: TaskEditDTO) => api.post<TaskDTO>(TASK_API, data).then((res) => res.data),
  update: (id: number, data: TaskEditDTO) =>
    api.put<TaskDTO>(`${TASK_API}/${id}`, data).then((res) => res.data),
  delete: (id: number) => api.delete(`${TASK_API}/${id}`),
  toggle: (id: number) => api.patch<TaskDTO>(`${TASK_API}/${id}/toggle`).then((res) => res.data),
};
