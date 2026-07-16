import { useQuery } from '@tanstack/react-query';
import { measurementKeys } from '../../../keys/measurementKeys';
import { measurementApi } from '../api/measurement.api';

export const useMeasurements = (categoryId: number, year: number | null) => {
  return useQuery({
    queryKey: measurementKeys.list(categoryId, year),
    queryFn: () => measurementApi.getAll(categoryId, year),
  });
};
