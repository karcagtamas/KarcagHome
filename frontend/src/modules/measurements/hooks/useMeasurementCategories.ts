import { useQuery } from '@tanstack/react-query';
import { measurementKeys } from '../../../keys/measurementKeys';
import { measurementCategoryApi } from '../api/measurement-category.api';

export const useMeasurementCategories = () => {
  return useQuery({
    queryKey: measurementKeys.categories(),
    queryFn: () => measurementCategoryApi.getAll(),
  });
};
