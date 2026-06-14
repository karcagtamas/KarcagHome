import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MeasurementApi } from "../api/measurement.api";
import { MeasurementCategoryApi } from "../api/measurement-category.api";

export const useMeasurements = () => {
    const queryClient = useQueryClient();

    const measurementsQuery = useQuery({
        queryKey: ['measurements'],
        queryFn: MeasurementApi.list, 
    });

    const measurementCategoriesQuery = useQuery({
        queryKey: ['measurement-categories'],
        queryFn: MeasurementCategoryApi.list,
    });

    return {
        measurements: measurementsQuery.data ?? [],
        categories: measurementCategoriesQuery.data ?? [],
        isLoading: measurementsQuery.isLoading || measurementCategoriesQuery.isLoading,
    }
};