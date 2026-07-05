import { useQuery } from '@tanstack/react-query';
import { measurementKeys } from '../../../keys/measurementKeys';
import { measurementApi } from '../api/measurement.api';

export const useMeasurementYears = (categoryId: number) => {
  return useQuery({
    queryKey: measurementKeys.years(categoryId),
    queryFn: () => measurementApi.getYears(categoryId),
  });
};
