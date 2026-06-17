import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskKeys } from '../../../keys/taskKeys';
import { taskApi } from '../api/task.api';
import type { TaskEditDTO } from '../models/task';

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: taskKeys.all });
  };

  const createMutation = useMutation({ mutationFn: taskApi.create, onSuccess: invalidate });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskEditDTO }) => taskApi.update(id, data),
    onSuccess: invalidate,
  });
  const removeMutation = useMutation({ mutationFn: taskApi.delete, onSuccess: invalidate });
  const toggleMutation = useMutation({ mutationFn: taskApi.toggle, onSuccess: invalidate });

  return {
    createMutation,
    updateMutation,
    removeMutation,
    toggleMutation,
    // Combined loading helper
    isPending:
      createMutation.isPending || updateMutation.isPending || removeMutation.isPending || toggleMutation.isPending,
  };
};
