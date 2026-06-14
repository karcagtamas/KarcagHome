import { useQuery } from '@tanstack/react-query';
import { measurementKeys } from '../../../keys/measurementKeys';
import { measurementApi } from '../api/measurement.api';

export const useMeasurements = () => {
  return useQuery({
    queryKey: measurementKeys.all,
    queryFn: () => measurementApi.getAll(),
  });
};
