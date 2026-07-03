import { useMutation, useQueryClient } from '@tanstack/react-query';
import { measurementCategoryApi } from '../api/measurement-category.api';
import { measurementKeys } from '../../../keys/measurementKeys';
import type { MeasurementCategoryEditDTO } from '../models/measurement';

export const useMeasurementCategoryMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: measurementCategoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.categories() });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MeasurementCategoryEditDTO }) =>
      measurementCategoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.categories() });
    },
  });

  const removeMutation = useMutation({
    mutationFn: measurementCategoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.categories() });
    },
  });

  return {
    createMutation,
    updateMutation,
    removeMutation,
    isPending: createMutation.isPending || updateMutation.isPending || removeMutation.isPending,
  };
};
