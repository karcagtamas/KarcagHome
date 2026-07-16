import { useMutation, useQueryClient } from '@tanstack/react-query';
import { measurementKeys } from '../../../keys/measurementKeys';
import type { MeasurementEditDTO } from '../models/measurement';
import { measurementApi } from '../api/measurement.api';

export const useMeasurementMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: measurementApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MeasurementEditDTO }) => measurementApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.all });
    },
  });

  const removeMutation = useMutation({
    mutationFn: measurementApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.all });
    },
  });

  return {
    createMutation,
    updateMutation,
    removeMutation,
    isPending: createMutation.isPending || updateMutation.isPending || removeMutation.isPending,
  };
};
